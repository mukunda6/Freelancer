'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a project demo video.
 *
 * - generateVideo - A function that handles the video generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as fs from 'fs';
import { Readable } from 'stream';

const GenerateVideoInputSchema = z.object({
    title: z.string().describe('The title of the project.'),
    description: z.string().describe('A description of the project.'),
});

export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
    videoUrl: z.string().describe('The data URI of the generated video.'),
});

export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

// Helper function to download the video from the signed URL provided by the model
async function downloadVideo(videoUrl: string): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    // Add API key before fetching the video.
    const videoDownloadResponse = await fetch(
        `${videoUrl}&key=${process.env.GEMINI_API_KEY}`
    );
    if (
        !videoDownloadResponse ||
        videoDownloadResponse.status !== 200 ||
        !videoDownloadResponse.body
    ) {
        throw new Error('Failed to fetch video');
    }

    const buffer = await videoDownloadResponse.buffer();
    return `data:video/mp4;base64,${buffer.toString('base64')}`;
}


export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
    // 1. Generate a script for the video
    const { text: script } = await ai.generate({
        prompt: `Create a short, punchy, and exciting voiceover script for a promotional video about a software project.
        Project Title: ${input.title}
        Project Description: ${input.description}
        The script should be no more than 30 seconds long.
        Script:`,
        config: { temperature: 0.8 },
    });

    const videoPrompt = `A cinematic, professional promotional video for a software project. Show abstract representations of code, user interfaces, and data flowing. The video should feel modern, clean, and dynamic. Voiceover: "${script}"`;

    // 2. Generate the video
    let { operation } = await ai.generate({
        model: 'googleai/veo-2.0-generate-001',
        prompt: videoPrompt,
        config: {
            durationSeconds: 8,
            aspectRatio: '16:9',
        },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // 3. Wait for the video generation to complete
    while (!operation.done) {
        // Poll every 5 seconds.
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video?.media?.url) {
        throw new Error('Failed to find the generated video URL');
    }
    
    // 4. Download the video and return it as a data URI
    const dataUri = await downloadVideo(video.media.url);

    return { videoUrl: dataUri };
}
