// AI features disabled for static build
import { z } from "zod"
import { createJobPostSchema } from "./page"

export async function createJobPostAction(
  values: z.infer<typeof createJobPostSchema>
) {
  return { success: true, data: values }
}
