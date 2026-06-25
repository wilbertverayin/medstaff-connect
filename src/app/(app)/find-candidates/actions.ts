"use server"

import { suggestDoctorsForHR } from "@/ai/flows/suggest-doctors-for-hr"
import { doctorProfiles } from "@/lib/data"
import type { z } from "zod"
import { findCandidatesSchema } from "./page"

export async function findCandidatesAction(
  values: z.infer<typeof findCandidatesSchema>
) {
  try {
    const suggestions = await suggestDoctorsForHR({
      ...values,
      doctorProfiles,
    })
    return { success: true, data: suggestions }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed to get suggestions from AI." }
  }
}
