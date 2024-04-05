import * as mongoose from "mongoose"
export const postModel= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 20
    },
    body:{
        type:String,
        required:true,
        minLength: 10,
        maxLength: 100
    },
    image:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})