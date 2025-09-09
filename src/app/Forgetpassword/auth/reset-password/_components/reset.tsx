'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetSchema } from '@/lib/schema/resetpass.schema'
import { resetSchemaForm } from '@/lib/schema/resetpass.schema'
import { resetpass } from '@/app/Forgetpassword/_actions/resetpass.action'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
export default function Reset() {
  const router = useRouter();
  const form = useForm<resetSchemaForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
      newPassword: ''
    },
    mode: 'onChange',
  })

const mutation = useMutation({
  mutationFn: resetpass,
  onSuccess: (data) => {
    if (data?.error) {
      toast.error(`❌ Reset failed: ${data.error}`)
    } else if (data?.token) {
      toast.success(" Password reset successful")
      console.log("Encrypted token:", data.token)
       router.push('/auth/login');

    }
  },
  onError: (error) => {
    console.error("Reset error:", error)
    toast.error(" Something went wrong")
  }
})



  async function onSubmit(data: resetSchemaForm) {
    mutation.mutate(data) // 🔥 استدعاء الميوتيشن
  }

  return (
    <Form {...form}>
      <form
        className='sm:w-full lg:w-1/3 mx-auto'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email */}
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem className='my-5'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          name='newPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem className='my-5'>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type='password' autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={mutation.isPending}
          className='bg-main text-white ml-auto block cursor-pointer hover:bg-main'
        >
          {mutation.isPending ? "Resetting..." : "Reset"}
        </Button>
      </form>
    </Form>
  )
}
