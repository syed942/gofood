import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

import axios from "axios";
import { Product1 } from "./Product1";
import Home1 from "./Home1";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Navbar } from "./Navbar";
import { Contacts } from "./Contacts";
import { Contacts2 } from "./Contacts2";
import { AddProduct } from "./AddProduct";
import { Carousel } from "./Carousel";
import "./index.css";
import { Footer } from "./Footer";
import { OrderMe } from "./OrderMe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderList } from "./OrderList";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Login } from "./Login"; // or wherever your Login component is
import { OrderMe1 } from "./OrderMe1";
// import { Login } from "./Login";
import Protected from "./Protected";
import { useNavigate } from "react-router-dom";
import { GlobalProvider } from "./GlobalStates/GlobalContext";
import { Navbar1 } from "./NavBar1";
import { Login1 } from "./Login1";
import { ContactUs } from "./ContactUs";
import { About } from "./About";
import { Signup } from "./Signup";
import { Product2 } from "./Product2";
import { OrderList1 } from "./OrderList1";
import { OrderMe2 } from "./OrderMe2";
import { Order3 } from "./Order3";
export const App1 = () => {
  console.log("app1 rendered");
  // const [admin, setAdmin] = ("");
  //const admin=localStorage.getItem("admin")
  // const login = localStorage.getItem("login");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log(storedUser?.login);
  console.log(storedUser?.admin);

  const admin = storedUser;

  //console.log("admis is", admin);
  const [searchText, setSearchText] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [products, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchPname, setSearchname] = useState("");
  const [id, setId] = useState("");
  console.log("contacts from app1 is", contacts);
  const url = "http://localhost:5000";
  const fetchData1 = async () => {
    const api = await axios.get(`${url}/`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    // console.log("contacts from home ",api.data.contact)
    setContacts(api.data.contact);
  };
  useEffect(() => {
    fetchData1();
  }, [reload]);
  const fetchData = async () => {
    const api = await axios.get(`${url}/products`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    setProducts(api.data.product);
  };
  useEffect(() => {
    fetchData();
  }, [reload]);
  const handleSearch = (data) => {
    var array = [data];
    if (data.Pname) {
      setProducts(array);
    } else {
      setContacts(array);
    }
  };
  const Logout = () => {
    localStorage.clear();
    navigate("/login1");
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com">
        <GlobalProvider>
          <Router>
            {storedUser?.login ? (
              <div>
                {storedUser?.admin ? (
                  <Navbar1
                    Logout={Logout}
                    handleSearch={handleSearch}
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                ) : (
                  <Navbar
                    Logout={Logout}
                    handleSearch={handleSearch}
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                )}
              </div>
            ) : (
              ""
            )}

            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Protected>
                    <Home1
                      searchText={searchText}
                      contacts={contacts}
                      setContacts={setContacts}
                      url={url}
                      reload={reload}
                      setReload={setReload}
                      id={id}
                      setId={setId}
                    />
                  </Protected>
                }
              />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/login1" element={<Login1 />} />
              <Route exact path="/order" element={<OrderMe />} />
              <Route exact path="/order1" element={<OrderMe1 />} />
              <Route exact path="/orderme2" element={<OrderMe2 />} />
              <Route exact path="/order3" element={<Order3 />} />
              <Route
                exact
                path="/products"
                element={
                  <Product1 products={products} setProducts={setProducts} />
                }
              />
              <Route
                exact
                path="/products2"
                element={
                  <Product2 products={products} setProducts={setProducts} />
                }
              />
              <Route exact path="/orderlist" element={<OrderList />} />
              <Route exact path="/orderlist1" element={<OrderList1 />} />
            </Routes>
            {/* <Footer /> */}
          </Router>
        </GlobalProvider>
      </GoogleOAuthProvider>
    </div>
  );
};
