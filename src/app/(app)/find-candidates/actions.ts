// AI features disabled for static build
import type { z } from "zod"
import { findCandidatesSchema } from "./page"

export async function findCandidatesAction(
  values: z.infer<typeof findCandidatesSchema>
) {
  return { success: true, data: [] as Array<{ name: string; matchReason: string }> }
}
