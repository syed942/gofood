import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModal.js";
import { Product } from "./ProductModel.js";
import bodyparser from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { Order } from "./OrderModal.js";

const app = express();
import formidable from "express-formidable";
app.use(
  cors({
  //  origin: true,
    origin: "http://localhost:5173", // frontend URL
   // credentials: true
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));
console.log("Mongo URI:", process.env.MONGO_URI);

//app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&appName=mernFood"
,
    { dbname: "mernFood" }
  )
  .then(() => console.log("mongodb connected with new server1"))
  .catch((error) => console.log(error));
//   mongoose
//   .connect(
//     "mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&appName=mernFood"
// ,
//     { dbname: "mernFood" }
//   )
  const MONGO_URI=   "mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/mernFood"

  
 console.log("monogo url",process.env.MONGO_URI)

// mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&appName=mernFood
// mongoose
//   .connect(
//     "mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&apPname=mernFood",
//     { dbname: "mernFood" }
//   )
//   .then(() => console.log("mongodb connected with new server1"))
//   .catch((error) => console.log(error));
// get all contacts
app.get("/", async (req, res) => {
  try {
    let contact = await Contact.find().sort({ createdAt: -1 });
    res.json({ message: "all adat found", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//get all products
app.get("/products", async (req, res) => {
  try {
    let product = await Product.find().sort({ createdAt: -1 });
    res.json({ message: "all adat found", product });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//add product below
const storage = multer.diskStorage({
  // destination: (req, file, cb) => cb(null, 'upload'),
  destination: (req, file, cb) =>
    cb(null, "../client/client-food/public/images"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
// if uploded img already has been uploaded then delete that first
// succes code for adding product with upload img
app.post("/addproduct", upload.single("image"), async (req, res) => {
  const { Pname, price } = req.body;
  console.log(Pname, price);
  const image = "../images" + "/" + req.file.filename;
  try {
    const exists = await Product.findOne({ Pname });
    if (exists) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = new Product({ Pname, price, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added", data: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//fetch allorders from collection orders
app.get("/orders", async (req, res) => {
  try {
   // let order = await Order.find().sort({ createdAt: -1 });
    let order = await Order.find();
    res.json({ message: "all orders found", order });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// succes code for adding product without upload img
app.post("/add", async (req, res) => {
  const { Pname, price, image } = req.body;
  try {
    const exists = await Product.findOne({ Pname });
    if (exists) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = new Product({ Pname, price, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added", data: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post('/addqueries', upload.none(), async (req, res) => {
  try {
    const { qname, email, message } = req.body;

    if (!qname || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuery = new Query({ qname, email, message });
    await newQuery.save();

    res.status(201).json({ message: "Query added", data: newQuery });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// server.js or routes file
// app.use("/api/orders/:orderId", formidable());
// app.put("/api/orders/:orderId", async (req, res) => {
//   const { orderId } = req.params.orderId;
//   const updates = req.body; // should be an array of updates
// console.log(orderId,req.body.updates)
//   try {
//     const promises = updates.map(update =>
//       Order.updateOne(
//         { _id: update._id, orderId },
//         { $set: {Pname:update.Pname, quantity: update.quantity, unitPrice: update.unitPrice 
//           ,amount:update.amount,orderAmount:update.orderAmount
//         } }
//       )
//     );

//     await Promise.all(promises);
//     res.status(200).json({ message: "Orders updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update orders" });
//   }
// });

app.use("/editorder", formidable());
//app.use(require("express-formidable")());
app.put("/editorder", (req, res) => {
  const {
     orderId,
    name,
    address,
    phone,
    orderDate,
    Pname: Pname,
    quantity: quantity,
    unitPrice: unitPrice,
    amount: amount,
    orderAmount:orderAmount
  } = req.fields;
  const productNames = Array.isArray(Pname) ? Pname : [Pname];
  const quantities = Array.isArray(quantity) ? quantity : [quantity];
  const amounts = Array.isArray(amount) 
  ? amount : [amount];
  const Oamounts = Array.isArray(orderAmount) 
  ? orderAmount : [orderAmount];
 
  const orders = productNames.map((product, index) => ({
    orderId,
    name,
    address,
    phone,
    orderDate,
    Pname: product,
    quantity: quantities[index],
    unitPrice: unitPrice[index],
    amount: amount[index],
    orderAmount:Oamounts[index]
  }));
  console.log("✅ updated Order:\n", orders);
  const newOrder = new Order({
    orderId,
    name,
    address,
    phone,
    orderDate,
    Pname,
    quantity,
    unitPrice,
    amount,
    orderAmount,
  });
  newOrder.save();
  res.status(200).json({ message: "Order saved", data: orders });
});

app.use("/addorder1", formidable());
//app.use(require("express-formidable")());
app.post("/addorder1", (req, res) => {
  const {
    orderId,
    name,
    address,
    phone,
    orderDate,
    Pname: Pname,
    quantity: quantity,
    unitPrice: unitPrice,
    amount: amount,
    orderAmount:orderAmount
  } = req.fields;
  const productNames = Array.isArray(Pname) ? Pname : [Pname];
  const quantities = Array.isArray(quantity) ? quantity : [quantity];
  const amounts = Array.isArray(amount) 
  ? amount : [amount];
  const Oamounts = Array.isArray(orderAmount) 
  ? orderAmount : [orderAmount];
 
  const orders = productNames.map((product, index) => ({
    orderId,
    name,
    address,
    phone,
    orderDate,
    Pname: product,
    quantity: quantities[index],
    unitPrice: unitPrice[index],
    amount: amount[index],
    orderAmount:Oamounts[index]
  }));
  console.log("✅ Received Orders:\n", orders);
  const newOrder = new Order({
    orderId,
    name,
    address,
    phone,
    orderDate,
    Pname,
    quantity,
    unitPrice,
    amount,
    orderAmount,
  });
  newOrder.save();
  res.status(200).json({ message: "Order saved", data: orders });
});
app.post("/", upload.single("image"), async (req, res) => {
  const { name, email, phone,password } = req.body;
  const image = "../images" + "/" + req.file.filename;
  try {
    const exists = await Contact.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Contact already exists" });
    }
    const newContact = new Contact({ name, email,password ,phone, image });
    await newContact.save();
    res.status(201).json({ message: "Product added", data: newContact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// edit user update code below and other fiedls update too
app.put("/editcontact/:id", upload.single("image"), async (req, res) => {
  const existingContact = await Contact.findById(req.params.id);
  const { name, email, password,phone } = req.body;
  const image = req.file ? req.file.filename : existingContact.image;
  const imagePath = "../images/" + image;
  // const image="../images"+"/"+req.file.filename //excellent line to update img
  console.log("uploaded image is", imagePath);
  try {
    existingContact.name = name;
    existingContact.email = email;
    existingContact.password = password;
    existingContact.phone = phone;
    existingContact.image = imagePath;
    // existingContact.image=image;
    if (!existingContact) {
      return res.status(404).json({ error: "contact not found" });
    }
    // const image=req.file?req.file.filename: existingContact.image;
    await existingContact.save();
    res.status(200).json({
      existingContact,
      success,
      messgae: "contact updated succeffully",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//edit product with image
app.put("/editproduct/:id", upload.single("image"), async (req, res) => {
  const existingProduct = await Product.findById(req.params.id);
  const { Pname, price } = req.body;
  const image = req.file ? req.file.filename : existingProduct.image;
  const imagePath = "../images/" + image;
  console.log("uploaded image is", imagePath);
  try {
    existingProduct.Pname = Pname;
    existingProduct.price = price;
    existingProduct.image = imagePath;
    if (!existingProduct) {
      return res.status(404).json({ error: "product not found" });
    }
    await existingProduct.save();
    res.status(200).json({
      existingProduct,
      success,
      messgae: "product updated succeffully",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//search a user by id
// in thunder client  url is
//http://localhost:5000/api/users/searchId/?id=68674a338d68ef8db61d8071
app.get("/api/users/searchId", async (req, res) => {
  const { id } = req.query;
  try {
    let contact = await Contact.findById(id); //returns matching object
    if (!contact) {
      return res.json({ message: "user does not exits" });
    }
    res.json({ message: "user found", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
}); //serach a single product
app.get("/searchProduct", async (req, res) => {
  const { id } = req.query;
  try {
    let product = await Product.findById(id); //returns matching object
    if (!product) {
      return res.json({ message: "product does not exits" });
    }
    res.json({ message: "product found", product });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// serach order of given phone number

//search a single product by name
app.get("/api/product/search", async (req, res) => {
  const { name } = req.query;

  const product = await Product.findOne({ Pname: name }); // or regex, etc.
  if (!product) return res.status(404).json({ message: "User not found" });
  res.json(product);
});
// search a single user by name
// in thunder client  url is GET /api/users/search?name=John
app.get("/api/users/search", async (req, res) => {
  const { name } = req.query;
  //const name = req.params.name;
  const user = await Contact.findOne({ name: name }); // or regex, etc.

  //console.log("user.name",user)
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
//delete contacts
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ message: "contact does not exits" });
    }
    let data = await Contact.findByIdAndDelete(id);
    res.json({ message: "user contact deleted successfully", data });
  } catch (error) {
    res.json({ message: error.message });
  }
});
//delete order
app.delete("/api/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
 
console.log(req.params)
  try {
    const result = await Order.deleteMany({ orderId }); // Delete all matching documents
    res.status(200).json({ message: "Orders deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

//edit  image of user only

//in thunder client write
// put http://localhost:5000/68674a338d68ef8db61d8071
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ message: "contact does not exits" });
    } else {
      let data = await Contact.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.json({ message: "user contact updated successfully", data });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//edit contact with image
app.post("editcontact/:id", upload.single("image"), async (req, res) => {
  const { name, email, phone } = req.body;
  const image = "../images" + "/" + req.file.filename;
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      return res.json({ message: "contact does not exits" });
    } else {
      let data = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone, image },
        { new: true }
      );
      res.json({ message: "user contact updated successfully", data });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
// delete single product from collectin
app.delete("/del/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.json({ message: "product does not exits" });
    }
    let data = await Product.findByIdAndDelete(id);
    res.json({ message: "product deleted successfully", data });
  } catch (error) {
    res.json({ message: error.message });
  }
});
app.listen(5000, () => console.log("server is running at 5000"));
// password nYGFsJmXJCsg1Cdp fro sishfaqhussain233
// user name: foodweb password: mern786
// paswsword:nYGFsJmXJCsg1Cdp  fro database user
//mongodb+srv://sishfaqhussain233:<db_password>@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&apPname=mernFood

// login with google
//const express = require("express");
//const passport = require("passport");
//import passport from "express"
import passport from "passport";
import session from "express-session"
//const session = require("express-session");
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
//import GoogleStrategy from "passport-google-oauth20.Strategy";
//const GoogleStrategy = require("passport-google-oauth20").Strategy;

//const app = express();

app.use(session({
  secret: "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",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: "798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com",
  clientSecret: "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",
 // callbackURL: "http://localhost:5173",
  callbackURL: "http://localhost:5000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  // Save or find user in DB here
  return done(null, profile);
}));

// Auth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure"
  })
);
app.get("/auth/success", (req, res) => {
  res.send("✅ Login Success");
});
app.get("/auth/failure", (req, res) => {
  res.send("❌ Login Failed");
});
//verify google tokent reciende  from front end (react)
//const { OAuth2Client } = require("google-auth-library");


import {OAuth2Client} from 'google-auth-library'
import { Query } from "./QueriesModel.js";
//const client = new 
//OAuth2Client(process.env.798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com);
const client = new OAuth2Client("798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com");
app.post("/auth/google-login", async (req, res) => {
  console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
  const { token } = req.body;
  console.log(token)

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
     // audience: client
     
     
     
          audience: process.env.client
         // "798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    // Optionally: check if user exists, or create user
    let user = await Contact.findOne({ email });
    if (!user) {
      user = await Contact.create({ email, name, googleId });
    }

    // Send JWT back
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ error: "Invalid token" });
  }
});
// routin issues sole
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });