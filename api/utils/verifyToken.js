import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";
import { CreateSuccess } from "./success.js";

export const verifyToken=(req,res,next)=>{
    console.log(req.cookies);
    const token=req.cookies.eccess_token;
    console.log(token);
    if(!token)
        return next(CreateError(401,"You r not authenticated"));
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log(err);
            return next(CreateError(403,"Token is not Valid"));
        }
        else{
            req.user=user;
        }
        console.log("hi");
        next();
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next();
        }
        else{
            return next(CreateError(403,"You are not authorized"))
        }
    })

}

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            return next(CreateError(403,"You are not authorized"))
        }
    })

}