import * as z from 'zod'
export const resetSchema = z.object({

    email:z.string().nonempty('this field is required').email('invalid email'),
 newPassword:z.string().nonempty('this field is required').regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
,
        'not vaild password',

    ),

})
export type resetSchemaForm = z.infer<typeof resetSchema>