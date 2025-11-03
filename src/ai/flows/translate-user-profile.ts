'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating user profiles and project descriptions into multiple languages.
 *
 * - translateUserProfile - A function that handles the translation of user profile content.
 * - TranslateUserProfileInput - The input type for the translateUserProfile function.
 * - TranslateUserProfileOutput - The return type for the translateUserProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateUserProfileInputSchema = z.object({
  text: z.string().describe('The text to translate (user profile or project description).'),
  targetLanguages: z.array(z.string()).describe('An array of target language codes (e.g., ["es", "fr"]).'),
  sourceLanguage: z.string().optional().describe('The source language code (e.g., "en"). Optional, will be auto-detected if not provided.'),
});

export type TranslateUserProfileInput = z.infer<typeof TranslateUserProfileInputSchema>;

const TranslateUserProfileOutputSchema = z.record(z.string(), z.string()).describe('A map of language codes to translated text.');

export type TranslateUserProfileOutput = z.infer<typeof TranslateUserProfileOutputSchema>;

export async function translateUserProfile(input: TranslateUserProfileInput): Promise<TranslateUserProfileOutput> {
  return translateUserProfileFlow(input);
}

const translateUserProfileFlow = ai.defineFlow(
  {
    name: 'translateUserProfileFlow',
    inputSchema: TranslateUserProfileInputSchema,
    outputSchema: TranslateUserProfileOutputSchema,
  },
  async input => {
    const { text } = await ai.generate({
      prompt: `Translate the following text into the specified languages. The output should be a raw JSON object with a single key "translations" which is a map of language codes to the translated text.\n\nText: """${input.text}"""\nTarget Languages: ${input.targetLanguages.join(', ')}\n${input.sourceLanguage ? `Source Language: ${input.sourceLanguage}` : ''}\n\nJSON Output:`,
      config: {
        responseFormat: 'json',
      }
    });

    try {
      const parsed = JSON.parse(text);
      if (parsed.translations) {
        return parsed.translations;
      }
      return parsed;
    } catch(e) {
      console.error("Failed to parse translation response:", text);
      throw new Error("Failed to get a valid translation from the AI model.");
    }
  }
);
