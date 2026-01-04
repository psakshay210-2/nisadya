'use server';
/**
 * @fileOverview A chatbot flow for answering questions about events.
 *
 * - chat - The main chat function.
 * - Message - The type for a chat message.
 */

import { ai } from '@/ai/genkit';
import { fetchEvents } from '@/lib/events-loader';
import { type Message } from '@/lib/types';
import { z } from 'genkit';

const EventDetailsSchema = z.object({
  eventName: z.string().optional(),
});

const EventInfoTool = ai.defineTool(
  {
    name: 'getEventInfo',
    description: 'Get details about a specific event or list all events.',
    inputSchema: EventDetailsSchema,
    outputSchema: z.string(),
  },
  async ({ eventName }) => {
    const events = await fetchEvents();
    if (eventName) {
      const event = events.find(e => e.title.toLowerCase().includes(eventName.toLowerCase()));
      if (event) {
        return JSON.stringify(event);
      }
      return `I couldn't find an event named "${eventName}". You can ask me to list all events.`;
    }
    return `Here are the available events: ${events.map(e => e.title).join(', ')}`;
  }
);

export async function chat(messages: Message[]): Promise<Message> {
  const llmResponse = await ai.generate({
    prompt: `You are an expert event assistant for the Nisadya college fest. Your goal is to answer questions about the events. Be friendly and helpful.

    If the user asks about events, always use the getEventInfo tool to get the most accurate and detailed information. Do not rely on your own knowledge.

    If the user asks a question that is not related to the events, politely decline to answer and steer the conversation back to the events.
    `,
    history: messages.map(m => ({ role: m.role, content: [{text: m.content}] })),
    tools: [EventInfoTool],
  });

  const choice = llmResponse.choices[0];
  const toolResponse = choice.toolRequest;

  if (toolResponse) {
    const toolResult = await toolResponse.execute();
    const toolResponseMessages = [
        ...messages,
        { role: 'assistant' as const, content: JSON.stringify(toolResponse) },
        { role: 'user' as const, content: JSON.stringify(toolResult) },
    ]
    const finalResponse = await ai.generate({
        prompt: `You are an expert event assistant for the Nisadya college fest. Your goal is to answer questions about the events. Be friendly and helpful.`,
        history: toolResponseMessages.map(m => ({ role: m.role, content: [{text: m.content}]})),
        tools: [EventInfoTool],
    });
    return { role: 'assistant', content: finalResponse.text };
  }

  return { role: 'assistant', content: choice.text.trim() };
}
