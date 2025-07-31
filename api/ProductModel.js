import mongoose from 'mongoose'
const productSchema=new mongoose.Schema({
    Pname:{
        type:"string",
        require:true,
        unique:true
    },
   
    price:{
        type:"number",
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
export const Product=mongoose.model("products",productSchema)