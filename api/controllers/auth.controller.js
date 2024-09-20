import Role from "../models/Role.js"
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";


// export const register=async (req,res,next)=>{
    
//     try {
//         const role=await Role.find({role:'user'});
//     const salt=await bcrypt.genSalt(10);
//     const hashPassword=await bcrypt.hash(req.body.password,salt);
//     const newUser=new User({
//         firstName:req.body.firstName,
//         lastName:req.body.lastName,
//         userName:req.body.userName,
//         email:req.body.email,
//         password:hashPassword,
//         roles:role

//     })
//     await newUser.save();
//     // return res.status(200).send("User Registered Succesfully");
//     return next(CreateSuccess(200,"User Registered Succesfully"));
//     } catch (error) {
//         if (error.code === 11000) {
//             // Handle duplicate key error
//             if (error.keyPattern.userName) {
//               return res.status(400).json({ message: 'Username already exists' });
//             } else if (error.keyPattern.email) {
//               return res.status(400).json({ message: 'Email already exists' });
//             }
//     }
//     return res.status(500).json({ message: 'Something went wrong' });


// }
// };

// export const login=async (req,res,next)=>{
//     try {
//         const user=await User.findOne({email:req.body.email});
//         if(!user){
//             return res.status(404).send("User Not found, first register");

//         }
//         const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
//         if(!isPasswordCorrect){
//             // return res.status(400).send("Password Incorrect");
//             return next(CreateError(400,"Password Incorrect"));

//         }
//         return next(CreateSuccess(200,"Login Success"));
//     } catch (error) {
//         return res.status(500).send("Something went wrong!");
        
//     }
// }


export const register=async (req,res,next)=>{
    
    try {
        const role=await Role.find({role:'user'});
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);
    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashPassword,
        roles:role

    })
    await newUser.save();
    // return res.status(200).send("User Registered Succesfully");
    return next(CreateSuccess(200,"User Registered Succesfully"));
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // Handle duplicate key error
            if (error.keyPattern.userName) {
            //   return res.status(400).json({ message: 'Username already exists' });
              return next(CreateError(400,"Username already exists"))
            } else if (error.keyPattern.email) {
            //   return res.status(400).json({ message: 'Email already exists' });
              return next(CreateError(400,"Email already exists"))
            }
    }
    // return res.status(500).json({ message: 'Something went wrong' });
    return next(CreateError(500,"Something went wrongg"));


}
};

export const login=async (req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        .populate("roles","role");

        const {roles}=user;
        if(!user){
            // return res.status(404).send("User Not found, first register");
            return CreateError(404,"User Not found, first register");

        }
        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            // return res.status(400).send("Password Incorrect");
            return next(CreateError(400,"Password Incorrect"));

        }
        else{
        const token=jwt.sign(
            {id:user._id,isAdmin:user.isAdmin,roles:roles},
            process.env.JWT_SECRET
        )
        // return next(CreateSuccess(200,"Login Success"));
        res.cookie("eccess_token",token,{httpOnly:true}).status(200)
        .json({
            status:200,
            message:"Login Success",
            data:user
        })
        }
    } catch (error) {
        // return res.status(500).send("Something went wrong!");
        return next(CreateError(500,"Something went wrong!"));
        
    }
}

export const registerAdmin=async (req,res,next)=>{
    
    try {
        const role=await Role.find({}); //admin will have all the roles i.e user and admin
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);
    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashPassword,
        isAdmin:true,
        roles:role

    })
    await newUser.save();
    // return res.status(200).send("User Registered Succesfully");
    return next(CreateSuccess(200,"Admin Registered Succesfully"));
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            if (error.keyPattern.userName) {
            //   return res.status(400).json({ message: 'Username already exists' });
              return next(CreateError(400,"Username already exists"))
            } else if (error.keyPattern.email) {
            //   return res.status(400).json({ message: 'Email already exists' });
              return next(CreateError(400,"Email already exists"))
            }
    }
    // return res.status(500).json({ message: 'Something went wrong' });
    return next(CreateError(500,"Something went wrong"));


}
};