import React, { useEffect,useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SelectAll } from "./SelectAll";
import {useLocation} from 'react-router-dom'
import QueryString from "query-string";

export const Contacts = ({
  searchText,
  contacts,
  setContacts,
  url,
  reload,
  setReload,  
  setId,
  handleModal,
}) => {
  // const loc = useLocation();
  //   console.log("location from contacts",loc.pathname);
  // const { search } = loc;
  // const query=QueryString.parse(search)
  // const [currentItems, setCurrentItems] = useState([]);
  // //const [ProductId, setPid] = useState(0);
  // const [limit, setLimit] = useState(query.limit);
  // console.log("limit of contact is",limit)
  
  // console.log("query object from contacts",query)
  // console.log("search from contacts", search)
  // console.log("Contacts from contafts1", contacts);
  console.log("searchText from contacts1 is", searchText);
  const deleteContacts = async (id) => {
    const api = await axios.delete(`${url}/${id}`, {
      Headers: {
        "content-type": "application/json",
      },
    });
        setReload(!reload);
  };
  const handleChangeChk = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    console.log(checked);
    if (name === "Allselect") {
            let tempUser = contacts.map((item) => {
        return { ...item, isChecked: checked };    
      });
            setContacts(tempUser);
    } else {
      let tempUser = contacts.map((item) =>
        item._id === name ? { ...item, isChecked: checked } : item
      );
      console.log(tempUser);
      setContacts(tempUser);      
    }    
  };
  const handleSubmitchk = (e) => {
    e.preventDefault();
    console.log("ckh pressed");
  };
  const deleteSelected = async (e) => {
    e.preventDefault();
    let newList = [...contacts];
    const a = contacts.filter((item) => item?.isChecked === true);
    console.log("checked array", a);
    if (window.confirm("Do you really want to delete seleted users?")) {
            for (let i = 0; i < a.length; i++) {
        const result = await axios.delete(`${url}/${a[i]._id}`);        
        const ind = newList.findIndex((el) => el._id === a[i]._id);
        newList.splice(ind, 1);
             }
      setContacts(newList);
    }    
  };  
  
  return (
    <div>
      <button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete selected users "
                    className="btn btn-md btn-danger"
                    style={{ width: "5%" }}
                    onClick={(e) => deleteSelected(e)}
                  >
                    Delete Multiple Users
                                     </button>
      <div className="container mt-4">
  <div className="card">
    <div className="card-header">
      User List
    </div>
    <div className="card-body table-responsive "
      >
       <form onSubmit={handleSubmitchk}>
       <table className="table table-bordered table-striped   w-100
      "
           style={{overflow:"auto"}}
      >
        <thead className="table-dark">
          <tr>
            <th  data-bs-toggle="tooltip" title="select all records"
                            className="text-white text-center"
                            > <SelectAll
                            list={contacts}
                            handleChange={handleChangeChk}
                           
                          /></th>
            <th>Name</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          
          {
              contacts?.map((el)=>
                <tr key={el?._id}>
                  <td className="text-center">
                  <input
                                  type="checkbox"
                                  name={el?._id}
                                  checked={el?.isChecked || false}
                                  onChange={handleChangeChk}
                                                                  />
                  </td>
                  <td>{el.name}</td>
                  <td>{el.phone}</td>
                  <td className="text-center">
                    <img src={el.image} alt="ll"
                     style={{width:"40px",height:"40px"}} />
                  </td>
                  <td className="d-flex flex-column justify-content-center">
                    <div>
                    <button className="btn btn-sm  btn-primary w-100 mb-3"
              onClick={()=>{setId(el._id),handleModal()                
              }}
              >Edit</button>
                     </div>
                    <div>
                    <button className="btn btn-sm btn-danger w-100"
              onClick={()=>deleteContacts(el._id)}
              >Delete</button>
                      
                    </div>

                  </td>
                </tr>
              )

            }           
                  
          
          
         
          
        </tbody>
      </table>

       </form>
      
    </div>
  </div>
  </div>

    </div>)
}
   
