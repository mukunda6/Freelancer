
'use server';
/**
 * @fileOverview A Genkit flow for generating project demo videos.
 *
 * - generateVideo - Creates a script and generates a video using AI.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MediaPart } from 'genkit/generate';
import * as fs from 'fs';
import { Readable } from 'stream';


const GenerateVideoInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectDescription: z.string().describe('A brief description of the project.'),
  projectFeatures: z.string().describe('A list of key features of the project.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  script: z.string().describe('The generated script for the video.'),
  videoUrl: z.string().describe('The data URI of the generated video.'),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async (input) => {
    // 1. Generate a script for the video
    const scriptPrompt = `Create a short, punchy voiceover script for a 5-second promotional video. The script should highlight a project with the following details. Be concise and energetic.

    Project Title: "${input.projectTitle}"
    Description: ${input.projectDescription}
    Key Features:
    ${input.projectFeatures}
    
    The script should be no more than 3-4 sentences.`;
    
    const scriptResponse = await ai.generate({
        prompt: scriptPrompt,
        config: { temperature: 0.7 },
    });
    const script = scriptResponse.text;

    // 2. Generate the video using the script
    const videoPrompt = `A cinematic, professional promotional video for a software project. Show abstract representations of code, user interfaces, and data flowing. The video should feel modern, clean, and dynamic. Voiceover: "${script}"`;

    let { operation } = await ai.generate({
        model: 'googleai/veo-2.0-generate-001',
        prompt: videoPrompt,
        config: {
            durationSeconds: 5,
            aspectRatio: '16:9',
        },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Wait for the video generation to complete
    while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
        throw new Error('Failed to find the generated video in the model response.');
    }
    
    // In a real app, you would upload this to a storage bucket (e.g., Cloud Storage)
    // and get a public URL. For this demo, we will return a data URI.
    // This is NOT recommended for production as it can be very large.
    const videoUrl = videoPart.media.url;
    
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable not set.");
    }
    const videoDownloadResponse = await fetch(`${videoUrl}&key=${apiKey}`);

    if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
        throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
    }
    
    const videoBuffer = await videoDownloadResponse.arrayBuffer();
    const videoBase64 = Buffer.from(videoBuffer).toString('base64');
    const videoDataUri = `data:${videoPart.media.contentType || 'video/mp4'};base64,${videoBase64}`;

    return {
      script: script,
      videoUrl: videoDataUri,
    };
  }
);
