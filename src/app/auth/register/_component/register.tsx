'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterSchemaForm } from '@/lib/schema/register.schema'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Register() {
  const form = useForm<RegisterSchemaForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    mode: 'onChange',
  });
let router = useRouter();
  async function onsubmit(data: RegisterSchemaForm) {
    console.log(data);

    try {
      let res = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );

    if (res.data.message === 'success') {
      console.log(res.data.message);
      toast.success('Register success', { position: 'top-center', duration: 3000 });
      form.reset();
      router.push('/auth/login');

    }
  }catch (error:any) {
    toast.error(error.response.data.message,{position:'top-center', duration:3000})
  }
  }

  return (
    <>
      <h2 className="my-2"> Register Now:</h2>
      <Form {...form}>
        <form
          className="lg:w-1/3 mx-auto sm:w-full"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>name</FormLabel>
                <FormControl>
                  <div>
                    <Input {...field} />
                    <p>{field.value}</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>email</FormLabel>
                <FormControl>
                  <div>
                    <Input type="email" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <div>
                    <Input type="password" autoComplete="off" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>repassword</FormLabel>
                <FormControl>
                  <div>
                    <Input type="password" autoComplete="off" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>phone</FormLabel>
                <FormControl>
                  <div>
                    <Input type="tel" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main"
          >
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}
