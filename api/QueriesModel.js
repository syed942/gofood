import mongoose from 'mongoose'
const queriesSchema=new mongoose.Schema({
    qname:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true,
       
       
    },
   
    message:{
        type:"string",
        require:true,
       
    },
   
    
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const Query=mongoose.model("queries",queriesSchema)