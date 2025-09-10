 "use client"
 import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { FormField , FormLabel,FormItem ,FormControl ,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addressSchema ,addressSchemaForm} from "@/lib/schema/address.schema"
import { checkoutOnline } from "../_actions/checkout.action"
export  default function Checkout({cartId}:{cartId:string}){
    const form = useForm<addressSchemaForm>({
        resolver: zodResolver(addressSchema),
        defaultValues:{
            details:'',
            city:'',
            phone:''

        },
        mode:'onChange'
    })
    async function OnSubmit(data:addressSchemaForm){
        const shippingAddress = data
 const res = await  checkoutOnline(cartId,process.env.NEXTAUTH_URL ,shippingAddress)
 console.log(res)
 if(res?.status ==='success')
    window.location.href = res?.session?.url
    }


    return(
        <>
<Form {...form}>
    <form onSubmit={form.handleSubmit(OnSubmit)} className="sm:w-full lg:w-1/3 mx-auto my-5">
        <FormField
          control ={form.control}
         name="details"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>detatils</FormLabel>
              <FormControl >
                <Input {...field} />
              </FormControl>
    
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control ={form.control}
         name="city"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>city</FormLabel>
              <FormControl >
                <Input {...field} />
              </FormControl>
    
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control ={form.control}
         name="phone"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>phone</FormLabel>
              <FormControl >
                <Input type="tel" {...field} />
              </FormControl>
    
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
    </form>
</Form>
        </>
    )
}