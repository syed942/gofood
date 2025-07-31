import React, { useEffect } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Contacts1 = ({searchText, contacts,url,reload,setReload, 
  setContacts,setId,handleModal}) => {
 console.log("Contacts from contafts1",contacts)
 console.log("searchText from contacts1 is",searchText)
 useEffect(()=>{
  searchuser()
 },[searchText])
 const searchuser=()=>{
  const filtered = contacts.filter(p =>p._id===searchText     
    );
    setContacts(filtered) 
 }
  const deleteContacts=async (id)=>{
    const api = await axios.delete(`${url}/${id}` ,{
      Headers: {
        "content-type": "application/json",
      }})
      console.log("contact delted nr.ishfaq")
      setReload(!reload)
  }
  //console.log("searchText from contact1.jsx is",searchText)
  return (
    <div>
            {contacts.map((el) => {
        return (
          <div key={el._id}
            className="container bg-dark text-white p-3 my-3
            d-flex justify-content-around align-items-center
            "
            style={{
              border: "2px solid yellow",
              borderRadius: "30px",
              width: "650px",
            }}
          >
            <div>
              <div className="d-flex justify-contant-center align-items-center">
              <div className="mx-3 mb-3">
                <img src={el.image} alt="ll" style={{width:"60px",height:"60px"}}/>
              </div>
              <div>               
                <h2>
                {el.name}
                </h2>                
              </div>
                </div>            
              <h4>
                <span className="material-icons mx-3">mark_email_read</span>{" "}
                {el.email}
              </h4>
              <h4>
                <span className="material-symbols-outlined mx-3">call</span>{" "}
                {el.phone}
              </h4>        
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button className="btn btn-lg btn-primary me-3"
              onClick={()=>{setId(el._id),handleModal()                
              }}
              >Edit</button>
              <button className="btn btn-lg btn-danger"
              onClick={()=>deleteContacts(el._id)}
              >Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
