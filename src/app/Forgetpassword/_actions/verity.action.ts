'use server'

type forgetemail={
    "resetCode":string,
   
}
import { getTokenAuth } from "@/utlitis/getTokenAuth"
export async function verifyResetCode({resetCode}:forgetemail){
  
  
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
        method:'POST',
        body:JSON.stringify({resetCode }),
        headers:{
            'Content-type':'application/json',
         
        }
    }
)
const data = await res.json();
return data;
}