import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js'
import authRoute from './routes/auth.js'; 
import userRoute from './routes/user.js'; 
import cookieParser from 'cookie-parser';
const app=express();
dotenv.config();



app.use(express.json());
app.use(cookieParser());
//to accept all body in json format
app.use("/api/role",roleRoute);
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);

//response handler middleware
app.use((obj,req,res,next)=>{
    const statusCode=obj.status||500;
    const message=obj.message||"Something went wrong";
    return res.status(statusCode).json({
        success:[200,201,204].some(a=>a===obj.status)?true:false,
        status:statusCode,
        message:message,
        data:obj.data
    });
         
});





//db connection
const connectMongoDB=async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");

    }
    catch(error){
        throw error;

    }
}

// app.use('/',(req,res)=>{
   
//     return res.send("Hello, welcome to mean stack")
// })

// app.use('/api/login',(req,res)=>{
//     return res.send("login suzzseful")
// })




app.listen(3000,()=>{
    connectMongoDB();
    console.log("connected to backend");
})