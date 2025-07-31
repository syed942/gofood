import mongoose from 'mongoose'
const contactSchema=new mongoose.Schema({
    name:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true,
        unique:true
    },
    password:{
        type:"string",
        require:true
    },
    phone:{
        type:"string",
        require:true
    },
    image:{
        type:"string",
        require:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const Contact=mongoose.model("Contacts",contactSchema)