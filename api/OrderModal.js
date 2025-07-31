import mongoose from 'mongoose'
const orderSchema=new mongoose.Schema({
  orderId:{
    type:"number",
   // require:true,
    unique:true
},
  name:{
    type:"string",
  //  require:true,    
},

orderDate:{
    type:"string",
    default:Date.now
},
address:{
  type:"string",
 // require:true,  
},
phone:{
  type:"string",
 // require:true
},

quantity:{
  type:"number",
  require:true
},
Pname:{
  type:"string",
  require:true
},
unitPrice:{
  type:"number",
  require:true
},
amount:{
  type:"number",
  require:true

},
orderAmount:{
  type:"number",
 require:true
}

  // userId: String,
  // orderDate: Date,
  // totalPrice: Number,
  // products: [
  //   {
  //     productId: String,
  //     quantity: Number
  //   }
  // ]
    
    
})
export const Order=mongoose.model("Orders",orderSchema)