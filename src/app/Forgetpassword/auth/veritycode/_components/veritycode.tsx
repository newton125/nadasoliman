'use client'


import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { codeSchema } from '@/lib/schema/code.schema'
import { codeSchemaForm } from '@/lib/schema/code.schema'
import {verifyResetCode } from '@/app/Forgetpassword/_actions/verity.action'


export default function Verity(){
     const router = useRouter();
    const form = useForm<codeSchemaForm>({
      resolver: zodResolver(codeSchema),
      defaultValues: {
        resetCode: '',
      },
      mode: 'onChange',
    })
  
  async  function  onSubmit(data: codeSchemaForm) {
      console.log('Form submitted:', data)
  const dataforget = await verifyResetCode(data);
  console.log(dataforget)
  if(dataforget.status === "Success" ){
    router.push('/Forgetpassword/auth/reset-password')
  }
  
    }
  
    return (
      <Form {...form}>
        <form
          className="sm:w-full lg:w-1/3 mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="resetCode"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel className ='text-xl'>reset your account password</FormLabel>
                <FormControl>
                  <Input type="text" {...field}           placeholder="code"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto bg-main">
            Verity
          </Button>
        </form>
      </Form>
    )
  }