import * as z from 'zod'
export const forgetSchema = z.object({
   email:z.string().nonempty('this field is required').email('invalid email'),



})
export type forgetSchemaForm = z.infer<typeof forgetSchema>