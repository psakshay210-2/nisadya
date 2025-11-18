'use server';
/**
 * @fileOverview An AI agent to summarize event details.
 *
 * - summarizeEvent - A function that generates a brief summary for a given event.
 * - SummarizeEventInput - The input type for the summarizeEvent function.
 * - SummarizeEventOutput - The return type for the summarizeEvent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventInputSchema = z.object({
  eventDetails: z.string().describe('The detailed description of the event.'),
});
export type SummarizeEventInput = z.infer<typeof SummarizeEventInputSchema>;

const SummarizeEventOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the event.'),
});
export type SummarizeEventOutput = z.infer<typeof SummarizeEventOutputSchema>;

export async function summarizeEvent(input: SummarizeEventInput): Promise<SummarizeEventOutput> {
  return summarizeEventFlow(input);
}

const summarizeEventPrompt = ai.definePrompt({
  name: 'summarizeEventPrompt',
  input: {schema: SummarizeEventInputSchema},
  output: {schema: SummarizeEventOutputSchema},
  prompt: `You are an event summarization expert. Your task is to generate a concise and engaging summary of an event based on its details.

Event Details: {{{eventDetails}}}

Summary:`,
});

const summarizeEventFlow = ai.defineFlow(
  {
    name: 'summarizeEventFlow',
    inputSchema: SummarizeEventInputSchema,
    outputSchema: SummarizeEventOutputSchema,
  },
  async input => {
    const {output} = await summarizeEventPrompt(input);
    return output!;
  }
);
