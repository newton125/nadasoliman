'use server'

type forgetemail={
    "email":string,
   
}
export async function forgetpass({email}:forgetemail){
  
  
const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
        method:'POST',
        body:JSON.stringify({email }),
        headers:{
            'Content-type':'application/json',
         
        }
    }
)
const data = await res.json();
return data;
}