import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddProduct } from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { Paginate } from "./Paginate";
import { Carousel } from "./Carousel";
import { Paginate1 } from "./Pagainate1";
import { Footer } from "./Footer";
import { Paginate2 } from "./Paginate2";
export const Product2 = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };
  console.log("id is=", id);
  const deleteProducts = async (id) => {
    const api = await axios.delete(`${url}/del/${id}`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    toast.success("product deleted successfully");
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  };
  const handleSearch = (data) => {
    let array = [data];
    setProducts(array);
  };
  const url = "http://localhost:5000";
  return (
    <>
     <div>
      <Carousel
        handleSearch={handleSearch}
        setSearchText={setSearchText}
        searchText={searchText}
        url={url}
      />
      {/* <AddProduct
        showModal={showModal}
        setShowModal={setShowModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        products={products}
        setId={setId}
      /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Paginate2
        id={id}
        handleModal={handleModal}
        deleteProducts={deleteProducts}
        showModal={showModal}
        setShowModal={setShowModal}
        setId={setId}
        products={products}
        reload={reload}
        setReload={setReload}
        url={url}
        setProducts={setProducts}
        initialPage={1}
      />
    </div>
    <Footer />
    </>
   
  );
};
