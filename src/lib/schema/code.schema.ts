import * as z from 'zod'
export const codeSchema = z.object({
resetCode: z.string()
  .nonempty('this field is required')
  .min(5, 'code must be 6 digits')
  .regex(/^\d+$/, 'code must be numbers only'),



})
export type codeSchemaForm = z.infer<typeof codeSchema>