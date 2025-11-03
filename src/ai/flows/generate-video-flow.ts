'use server';
/**
 * @fileOverview A Genkit flow for generating a short video script from project details.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateVideoScriptInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('A short description of the project.'),
  features: z.string().describe('The key features of the project.'),
});

export type GenerateVideoScriptInput = z.infer<typeof GenerateVideoScriptInputSchema>;

export const GenerateVideoScriptOutputSchema = z.object({
  script: z
    .string()
    .describe(
      'A short, engaging voiceover script for a 15-second promotional video, based on the project details. The script should be concise and impactful.'
    ),
});

export type GenerateVideoScriptOutput = z.infer<
  typeof GenerateVideoScriptOutputSchema
>;

export async function generateVideoScript(
  input: GenerateVideoScriptInput
): Promise<GenerateVideoScriptOutput> {
  const prompt = ai.definePrompt(
    {
      name: 'generateVideoScriptPrompt',
      input: { schema: GenerateVideoScriptInputSchema },
      output: { schema: GenerateVideoScriptOutputSchema },
      prompt: `Generate a short, engaging voiceover script for a 15-second promotional video about a software project.

    The script should be concise, impactful, and highlight the key aspects of the project.

    Project Title: {{{title}}}
    Description: {{{description}}}
    Key Features: {{{features}}}

    Generate a voiceover script that is exciting and easy to understand.
    `,
    }
  );

  const { output } = await prompt(input);
  return output!;
}
