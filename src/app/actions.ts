'use server';

import { chat } from '@/ai/flows/ai-chat-flow';
import { type Message } from '@/lib/types';

export async function handleChat(messages: Message[]): Promise<Message> {
  try {
    const output = await chat(messages);
    return output;
  } catch (error) {
    console.error('Error handling chat:', error);
    return {
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.',
    };
  }
}
