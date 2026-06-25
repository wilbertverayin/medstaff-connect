// src/ai/flows/suggest-doctors-for-hr.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting doctors to HR based on job post criteria.
 *
 * - suggestDoctorsForHR - A function that suggests doctors for a given job posting.
 * - SuggestDoctorsForHRInput - The input type for the suggestDoctorsForHR function.
 * - SuggestDoctorsForHROutput - The return type for the suggestDoctorsForHR function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDoctorsForHRInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job posting.'),
  specialtyNeeded: z.string().describe('The specialty required for the job.'),
  location: z.string().describe('The location of the job.'),
  jobType: z.enum(['Locum', 'Permanent', 'Fellowship', 'Telemed']).describe('The type of job (Locum, Permanent, Fellowship, or Telemed).'),
  doctorProfiles: z.array(
    z.object({
      name: z.string().describe('The name of the doctor.'),
      specialization: z.string().describe('The doctor\'s specialization.'),
      residency: z.string().optional().describe('The doctor\'s residency completion.'),
      fellowship: z.string().optional().describe('The doctor\'s fellowship completion.'),
      affiliations: z.string().describe('The doctor\'s clinic/hospital affiliations.'),
      city: z.string().describe('The city where the doctor is located.'),
      province: z.string().describe('The province where the doctor is located.'),
      availableFor: z.array(z.enum(['Locum', 'Full-time', 'Telemed', 'Referrals'])).describe('The doctor\'s availability (Locum, Full-time, Telemed, Referrals).'),
      bio: z.string().describe('A short biography of the doctor (max 200 characters).'),
    })
  ).describe('An array of doctor profiles to evaluate.'),
});

export type SuggestDoctorsForHRInput = z.infer<typeof SuggestDoctorsForHRInputSchema>;

const SuggestDoctorsForHROutputSchema = z.array(
  z.object({
    name: z.string().describe('The name of the doctor.'),
    matchReason: z.string().describe('The reason why this doctor is a good match for the job.'),
  })
).describe('An array of doctors who are a good fit for the job, along with the reasons for the match.');

export type SuggestDoctorsForHROutput = z.infer<typeof SuggestDoctorsForHROutputSchema>;

export async function suggestDoctorsForHR(input: SuggestDoctorsForHRInput): Promise<SuggestDoctorsForHROutput> {
  return suggestDoctorsForHRFlow(input);
}

const suggestDoctorsForHRPrompt = ai.definePrompt({
  name: 'suggestDoctorsForHRPrompt',
  input: {schema: SuggestDoctorsForHRInputSchema},
  output: {schema: SuggestDoctorsForHROutputSchema},
  prompt: `You are an AI assistant specialized in matching doctors to job postings.
  Given a job posting and a list of doctor profiles, identify the doctors who are a good fit for the job and explain why.

  Job Posting:
  - Title: {{{jobTitle}}}
  - Specialty Needed: {{{specialtyNeeded}}}
  - Location: {{{location}}}
  - Type: {{{jobType}}}

  Doctor Profiles:
  {{#each doctorProfiles}}
  - Name: {{{name}}}
  - Specialization: {{{specialization}}}
  - Location: {{{city}}}, {{{province}}}
  - Available For: {{#each availableFor}}{{{this}}} {{/each}}
  - Bio: {{{bio}}}

  Based on the job requirements, determine which doctors from the provided profiles are a good fit.
  For each doctor that is a good fit, provide a brief explanation of why they are a suitable candidate. Return an array of doctors who are a good fit with their corresponding explanation.
  Do not return doctors who are not a good fit.
  {{/each}}`,
});

const suggestDoctorsForHRFlow = ai.defineFlow(
  {
    name: 'suggestDoctorsForHRFlow',
    inputSchema: SuggestDoctorsForHRInputSchema,
    outputSchema: SuggestDoctorsForHROutputSchema,
  },
  async input => {
    const {output} = await suggestDoctorsForHRPrompt(input);
    return output!;
  }
);
