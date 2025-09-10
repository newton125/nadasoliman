import * as z from 'zod'

export const addressSchema = z.object({
  city: z
    .string()
    .min(2, "City name is too short")
    .max(50, "City name is too long")
    .regex(/^[a-zA-Z\s]+$/, "City name should only contain letters"), // يسمح بالحروف والمسافات فقط

  details: z
    .string()
    .min(5, "Details too short")
    .max(200, "Details too long"),

  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Phone number is invalid") // يسمح بالأرقام، مع خيار + في البداية، من 10 إلى 15 رقم
})

export type addressSchemaForm = z.infer<typeof addressSchema>
