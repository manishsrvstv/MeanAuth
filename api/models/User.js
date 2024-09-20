import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            required:false,
            
        },
        isAdmin:{
            type:Boolean,
            default:false,

        },
        roles:{
            type:[Schema.Types.ObjectId], //foreign key id from role table
            required:true,
            ref:"Role" //referenes role table


        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("User",UserSchema);