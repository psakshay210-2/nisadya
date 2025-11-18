'use server';

import { summarizeEvent, SummarizeEventInput, SummarizeEventOutput } from '@/ai/flows/ai-summarize-events';

export async function handleSummarize(input: SummarizeEventInput): Promise<SummarizeEventOutput> {
  try {
    const output = await summarizeEvent(input);
    return output;
  } catch (error) {
    console.error('Error summarizing event:', error);
    throw new Error('Failed to summarize event. Please try again.');
  }
}
