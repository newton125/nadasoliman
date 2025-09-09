'use server'

type shippingAddressType={
    "details":string,
    "phone":string,
    "city":string
}
import { getTokenAuth } from "@/utlitis/getTokenAuth"
export async function checkoutOnline(cartId:string,url=process.env.NEXTAUTH_URL,shippingAddress: shippingAddressType){
    const token = await getTokenAuth()
    if (!token)
        throw new Error('Unauthuorized,login first')
const res = await fetch(`${process.env.API}orders/checkout-session/${cartId}?url=${url}`,
    {
        method:'POST',
        body:JSON.stringify({
            shippingAddress

        }),
        headers:{
            'Content-type':'application/json',
            token
        }
    }
)
const data = await res.json();
return data;
}