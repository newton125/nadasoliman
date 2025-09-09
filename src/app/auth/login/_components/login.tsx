'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, LoginSchemaForm } from '@/lib/schema/login.schema'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
export default function Login() {
  const form = useForm<LoginSchemaForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  })

  function handleGitHubSignIn() {
    signIn('github', { callbackUrl: '/' })
  }

  const firstError = Object.keys(form.formState.errors)[0];

  async function onSubmit(data: LoginSchemaForm) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Login Failed: " + res.error , { position: 'top-center', duration: 3000 });
    } else if (res?.ok) {
      window.location.href = '/'
      toast.success("Login Success", { position: 'top-center', duration: 3000 });
    }
  }

  return (
    <>
      <h2 className='my-2 '>Login Now:</h2>
      <Form {...form}>
        <form className='sm:w-full  lg:w-1/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                {firstError === 'email' && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem className='my-5 '>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='off' {...field} />
                </FormControl>
                {firstError === 'password' && <FormMessage />}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className='bg-main text-white ml-auto block cursor-pointer hover:bg-main'
          >
            Login
          </Button>
        </form>
      </Form>
<Link href="/Forgetpassword/auth/forget-password" className='hover:text-main'>forget your password ?</Link>
      {/* <div className='text-center  w-1/3'>
        <Button onClick={handleGitHubSignIn} className='bg-gray-800 text-white sm:w-full block cursor-pointer hover:bg-gray-900'>
          Login with GitHub
          <i className="fa-brands fa-github mx-2"></i>
        </Button>
      </div> */}
    </>
  )
}
