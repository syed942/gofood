
//MONGO_URI= mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/mernFood?retryWrites=true&w=majority

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
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://sishfaqhussain233:nYGFsJmXJCsg1Cdp@mernfood.mphwczs.mongodb.net/?retryWrites=true&w=majority&apPname=mernFood",
    { dbname: "mernFood" }
  )
  .then(() => console.log("mongodb connected with server"))
  .catch((error) => console.log(error));
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
    let order = await Order.find().sort({ createdAt: -1 });
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
    orderAmount,
  } = req.fields;
  const productNames = Array.isArray(Pname) ? Pname : [Pname];
  const quantities = Array.isArray(quantity) ? quantity : [quantity];
  const amounts = Array.isArray(amount) ? amount : [amount];
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
    orderAmount,
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
  const { name, email, phone } = req.body;
  const image = "../images" + "/" + req.file.filename;
  try {
    const exists = await Contact.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Contact already exists" });
    }
    const newContact = new Contact({ name, email, phone, image });
    await newContact.save();
    res.status(201).json({ message: "Product added", data: newContact });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// edit user update code below and other fiedls update too
app.put("/editcontact/:id", upload.single("image"), async (req, res) => {
  const existingContact = await Contact.findById(req.params.id);
  const { name, email, phone } = req.body;
  const image = req.file ? req.file.filename : existingContact.image;
  const imagePath = "../images/" + image;
  // const image="../images"+"/"+req.file.filename //excellent line to update img
  console.log("uploaded image is", imagePath);
  try {
    existingContact.name = name;
    existingContact.email = email;
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
