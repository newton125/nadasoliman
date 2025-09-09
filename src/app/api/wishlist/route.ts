import { NextResponse, NextRequest } from "next/server";
import {getToken} from "next-auth/jwt"
export async function GET(req:NextRequest){
    const token = await getToken({req})
    if(!token)
        return NextResponse.json({status:401,error:'Unautorized'})
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',
        {headers:{
            token: token.token
        }}
    )
    const payload = await res.json()
    return NextResponse.json(payload)
}