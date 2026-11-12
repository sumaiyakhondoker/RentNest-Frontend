
"use server"

import { cookies } from "next/headers";


export const getNewAccessToken = async() => {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get("refreshToken")?.value || null



    if(!refreshToken){
        // throw new Error('You are not logged in. Please login')
        return {
            success:false,
            message: 'Refresh token not found'
        }
    }

    // console.log(process.env.BACKEND_API_URL);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers:{
            Cookie : `refreshToken=${refreshToken}`
            // Authorization: `${refreshToken}`
        },
        cache:'no-store'
       
    })



  if (!res.ok) {
    return {
      success: false,
      message: "Failed to refresh access token",
    };
  }

    const result = await res.json()
console.log('result of refreshToken.startsWith', result);
    return result

};

