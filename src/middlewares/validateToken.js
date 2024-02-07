import jwt from "jsonwebtoken"
import { ACESS_Token } from "../config.js"
export const authRequired =  (req,res,next)=>{ // se esta validando el token que sea igual al del cliente
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({message:"no token ,authorization denied"})
    }else{
        jwt.verify(token,ACESS_Token, (err, user)=>{ // user es el contenido del token
            if(err){return res.status(401).json({message:"Invalid token"})}
            req.user = user
        })
    }
    next()
}