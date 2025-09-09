import * as z from 'zod'
export const RegisterSchema = z.object({
    name:z.string().nonempty('this field is required').min(2,'min 2 char').max(10,
        'max 10 char'
    ),
    email:z.string().nonempty('this field is required').email('invalid email'),
    password:z.string().nonempty('this field is required').regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
,
        'not vaild password',

    ),
    rePassword:z.string().nonempty('this field is required'),
    phone: z.string().nonempty('this field is required').regex(
        /^(002)?(01)[0-25]\d{8}$/,
        'invalid phone number'
    )
}).refine((data) => data.password === data.rePassword, {
    message: 'not match',
    path: ['rePassword']
})
export type RegisterSchemaForm = z.infer<typeof RegisterSchema>