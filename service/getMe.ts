
"use server"

import { cookies } from "next/headers";


export const getMe = async() => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null



    if(!accessToken){
        // throw new Error('You are not logged in. Please login')
        return {
            success:false,
            message: 'You are not logged in. Please login at first'
        }
    }


    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers:{
            // Cookie: `accessToken=${accessToken}`
            Authorization: `${accessToken}`
        },
        cache:'force-cache',
        next:{
            revalidate: 60 * 60 *24,
            tags:["my-profile"]

        }
    })


    const result = res.json()


    return result

};

