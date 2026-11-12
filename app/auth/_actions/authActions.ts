"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth.schema"



export const loginAction = async(data:LoginFormValues)=>{


const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method:"POST",
    headers:{
                'content-type': 'application/json'
            },
    body: JSON.stringify(data)
    
})

const result= await res.json()


if(!result.success){
    return result
    
}


if(result.success){
    const cookieStore = await cookies()
    cookieStore.set('accessToken', result.data.accessToken,{
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax'

    })

     cookieStore.set('refreshToken', result.data.refreshToken,{
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax'

    })




    const loggedInUserInfo = jwt.decode(result.data.accessToken) as JwtPayload

    if(loggedInUserInfo.role === 'LANDLORD'){
         
        redirect('/dashboard/landlord')

    }else if(loggedInUserInfo.role === 'ADMIN'){
        
        redirect('/dashboard/admin')

    }else if(loggedInUserInfo.role === 'TENANT'){
       
        redirect('/dashboard/tenant')

    }


    
}
   

return result


}

export const registerAction = async(data:RegisterFormValues)=>{

    // console.log('data inside action');

const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method:"POST",
    headers:{
                'content-type': 'application/json'
            },
    body: JSON.stringify(data)
    
})

const result= await res.json()


if(!result.success){
    return result
    
}


if(result.success){
    const cookieStore = await cookies()
    cookieStore.set('accessToken', result.data.accessToken,{
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax'

    })

     cookieStore.set('refreshToken', result.data.refreshToken,{
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax'

    })




    const registeredUserInfo = jwt.decode(result.data.accessToken) as JwtPayload

    if(registeredUserInfo.role === 'LANDLORD'){
         
        redirect('/dashboard/landlord')

    }else if(registeredUserInfo.role === 'ADMIN'){
        
        redirect('/dashboard/admin')

    }else if(registeredUserInfo.role === 'TENANT'){
       
        redirect('/dashboard/tenant')

    }


    
}
   

return result


}




