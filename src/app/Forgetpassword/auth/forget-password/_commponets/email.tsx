'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { forgetSchema } from '@/lib/schema/forgetpass.schema'
import { forgetSchemaForm } from '@/lib/schema/forgetpass.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgetpass } from '@/app/Forgetpassword/_actions/forgetpass.action'
import { useRouter } from 'next/navigation'
export default function Email() {
    const router = useRouter();
  const form = useForm<forgetSchemaForm>({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })

async  function  onSubmit(data: forgetSchemaForm) {
    console.log('Form submitted:', data)
const dataforget = await forgetpass(data);
console.log(dataforget)
if(dataforget.statusMsg === "success" ){
  router.push('/Forgetpassword/auth/veritycode')
}

  }

  return (
    <Form {...form}>
      <form
        className="sm:w-full lg:w-1/3 mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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