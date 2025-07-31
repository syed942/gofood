import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import { Contacts1 } from "./Contacts1.jsx";
import { AddContacts } from "./AddContacts.jsx";
// import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "./Navbar.jsx";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Contacts2 } from "./Contacts2.jsx";
// const [limit, setLimit] = useState(null);
import { Contacts } from "./Contacts.jsx";
function Home1({ searchText,
  contacts,
  setContacts,
  url,
  reload,
  setReload,
  id,
  setId,  
 }) {
  const [showModal, setShowModal] = useState(false);
  const [limit,setLimit] =useState(5)
  const [offset,setOffset] = useState(0)
  console.log("contacts from home1")
   const navigate=  useNavigate()
   const params = new URLSearchParams({ limit: 5, offset: 0 });
useEffect(()=>{
  //  navigate(`/?limit=${limit}.toString()&&offset=+${offset}`);
  navigate("/?limit=5&&offset=0")
  //setShowNav(true)
},
 [])
  useEffect(()=>{
    localStorage.removeItem("name")
  },[])
console.log(localStorage.getItem("name"))
    const handleModal = () => {
    setShowModal(!showModal);
  };
      return (
    <>      
      <AddContacts
        handleModal={handleModal}
        showModal={showModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        contacts={contacts}
        setId={setId}
      />
     {/* <Contacts
        contacts={contacts}  
        setContacts={setContacts}     
        url={url}
        reload={reload}
        setReload={setReload}
        handleModal={handleModal}
        setId={setId}
        searchText={searchText}
      /> */}
      <Contacts2
         searchText={searchText}
         contacts={contacts}
         setContacts={setContacts}
         url={url}
         handleModal={handleModal}
         reload={reload}
         setReload={setReload}
         limit={limit}
         setLimit={setLimit}
         id={id}
         setId={setId}
      />
      
    </>
  );
}
export default Home1;
