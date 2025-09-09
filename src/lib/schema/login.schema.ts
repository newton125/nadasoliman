import * as z from 'zod'
export const LoginSchema = z.object({

    email:z.string().nonempty('this field is required').email('invalid email'),
    password:z.string().nonempty('this field is required') .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'not vaild password'
    
       

    ),

})
export type LoginSchemaForm = z.infer<typeof LoginSchema>