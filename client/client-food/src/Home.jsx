import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import { Contacts1 } from "./Contacts1.jsx";
import { AddContacts } from "./AddContacts.jsx";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "./Navbar.jsx";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Contacts2 } from "./Contacts2.jsx";
import { Contacts } from "./Contacts.jsx";
function Home({
  searchText,
  contacts,
  setContacts,
  url,
  reload,
  setReload,
  id,
  setId,
}) {
  
  console.log("searchText from home", searchText);
  // const {searchText} = useParams()
  //const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //   const [reload, setReload] = useState(false);
  //   const [id, setId] = useState("");
  console.log("array of contacts state", contacts);

  // const url = "http://localhost:5000";
  //   const fetchData = async () => {
  //     const api = await axios.get(`${url}/`, {
  //       Headers: {
  //         "content-type": "application/json",
  //       },
  //     });
  //    // console.log("contacts from home ",api.data.contact)
  //     setContacts(api.data.contact);
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, [reload]);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  console.log("id is=", id);
  const handleSearch = (data) => {
    let array = [data];
    setContacts(array);
    console.log(data.name);
  };
  // const navigate = useNavigate();
  // useEffect(() => {
  //  // navigate("contact2/?limit=5&&offset=0")
  //   navigate("contacts2/?limit=5&&offset=0");
  // }, []);
  // const navigate=useNavigate()
  // useEffect(()=>{
  //  // navigate("contact2/?limit=5&&offset=0")
  //   navigate("/?limit=10&&offset=0")   
  
  //   },[])
  return (
    <>
   
      {/* <Navbar handleSearch={handleSearch} url={url} /> */}
      <ToastContainer position="top-right" autoClose={3000} />
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
      <Contacts
        contacts={contacts}  
        setContacts={setContacts}     
        url={url}
        reload={reload}
        setReload={setReload}
        handleModal={handleModal}
        setId={setId}
        searchText={searchText}
      />
      {/* <Contacts2
        contacts={contacts}  
        setContacts={setContacts}     
        url={url}
        reload={reload}
        setReload={setReload}
        handleModal={handleModal}
        setId={setId}
        searchText={searchText}
      /> */}
       {/* <Contacts2
        contacts={contacts}       
        url={url}
        reload={reload}
        setReload={setReload}
        handleModal={handleModal}
        setId={setId}
        searchText={searchText}
      />  */}
      
    </>
  );
}
export default Home;
