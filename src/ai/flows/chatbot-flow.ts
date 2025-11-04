'use server';

/**
 * @fileOverview This file defines a Genkit flow for a simple chatbot.
 *
 * - chatbotFlow - A function that takes a history of messages and returns a response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData, Part } from 'genkit/generate';

const ChatbotInputSchema = z.object({
  history: z.array(z.object({
    role: z.string(),
    content: z.array(z.object({
        text: z.string()
    }))
  })),
});

export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string();

export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
    const history: MessageData[] = input.history.map(m => ({
        role: m.role as 'user' | 'model',
        content: m.content as Part[]
    }));
    
    // Extract the latest user message to use as the prompt, and the rest as history
    const latestMessage = history.pop();
    if (!latestMessage || latestMessage.role !== 'user') {
        return "Sorry, I can only respond to user messages.";
    }

    const { text } = await ai.generate({
        prompt: latestMessage.content[0]!.text, // Use the last message as the main prompt
        history: history, // Use the rest of the conversation as history
        system: `You are a helpful assistant for Linkfolio, a platform for freelancers and clients. Keep your answers concise.`,
        config: {
            temperature: 0.5,
        }
    });
    return text;
}
