import jwt from "jsonwebtoken"


const verifyToken = (token:string, secret:string)=>{
    try {
    const verifiedToken = jwt.verify(token, secret)
    console.log('verified token--------------------------', verifiedToken);
    return {
        success: true,
        data: verifiedToken
    }
    } catch (error: any) {
        console.log('Token verification failed:', error);
       return {
        success: false,
        error: error.message
       }
    }
}

export const jwtUtils = {
 
    verifyToken
}