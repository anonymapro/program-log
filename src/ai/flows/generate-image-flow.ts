'use server';
/**
 * @fileOverview An image generation AI agent.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('Le prompt pour la génération d\'images.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('L\'URI de données de l\'image générée.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({prompt}) => {
    const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Générez une image photoréaliste pour un article de presse sur le thème suivant : ${prompt}`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      
      const imageUrl = media.url;
      if (!imageUrl) {
        throw new Error('La génération de l\'image a échoué');
      }

    return {imageUrl};
  }
);
