import * as mongoose from "mongoose"
export const userModel= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: true
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:13
    },
    bio:{
        type:String,
        minLength: 3,
        maxLength: 20
    },
    image:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone:{
        type:String
    }
})