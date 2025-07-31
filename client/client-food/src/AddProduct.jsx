import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export const AddProduct = ({  
setShowModal,  
  handleModal,
  showModal,
  url,
  reload,
  setReload,
  products,
  id,
  setId,
}) => {
  console.log(setReload());
  const [Pname, setname] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
   useEffect(() => {
     if(id){
      for(let i=0;i<products?.length;i++){
        if(id === products[i]._id){
          setname(products[i].Pname)
          setPrice(products[i].price)
          setImage(products[i].image);
          setPreviewImage(products[i].image);
          
          break
        }
      }
     }
   }, [id])  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      const formdata = new FormData();
      formdata.append("Pname", Pname);
      formdata.append("price", price);      
      formdata.append("image", image);
      try {
        const api1 = await axios.put(`${url}/editproduct/${id}`, formdata, {
          Headers: {
            "content-type": "application/json",
          },
        });
       
        toast.success(`Product updated successfully, ${Pname}!`);
       
        setTimeout(() => {
          window.location.reload(true)
          
        }, 3000);
        setShowModal(!showModal)
        setname("");
        setPrice("");
        setImage("");
        setId("");       
        
      } catch (err) {
        console.log(err.message)       
      }
    } else {
      const formdata = new FormData();
    formdata.append("Pname", Pname);
    formdata.append("price", price);
    formdata.append("image", image);
    try {
      const api = await axios.post(`${url}/addproduct`, formdata, {
        Headers: {
          "content-type": "application/json",
        },
      });
      toast.success(`Product created successfully, ${Pname}!`);       
      setTimeout(() => {
        window.location.reload(true)        
      }, 3000);
      setShowModal(!showModal)
      setname("");
      setPrice("");
      setImage("");
      setId("");
         } catch (err) {
      console.log("error message",err.message)     
    }
    }    
  };
  return (
    <div className="wrapper">
      <div className="main">
        
      <div className="container-fluid p-0 " >
        <div className=" position-relative top-0  text-end" >
        <button className="btn btn-light btn-md 
        w-20 mt-3
        "data-toggle="tooltip"
        data-placement="top"
        title="Add New Item "
               onClick={()=>setShowModal(!showModal)}>
          <FontAwesomeIcon icon={faPlus} className="me-2" 
          style={{color:"green"}}
          />
         
        </button>
        </div>        
        {/* Modal Code  */}
        {showModal && (
          <div className="modal d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-dark text-white"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header d-flex justify-content-center align-items-center">
                  <h1 className="modal-title ">
                    {id?'Edit Product':'Add Product'}                   
                  </h1>
                  {/* <button type="button" class="btn-close"  aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <form onSubmit={submitHandler}>
                    <div className="mb-3 text-start">
                      <label htmlFor="pname" className="form-label ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pname"
                        name="pname"
                        required
                        value={Pname}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="img" className="form-label">
                        Add Your Picture
                      </label>
                      <input
                        type="file"
                        id="img"
                        name="image"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          const file = e.target.files[0];
                          if (file) {
                            var imageURL = URL.createObjectURL(file);
                            setPreviewImage(imageURL);
                          }
                        }}
                      />
                      <img src={previewImage} alt="Selected" width="200" />
                    </div>
                    <div
                      className="modal-footer 
                my-3
                d-flex justify-content-center align-items-center"
                    >
                      {" "}
                      <div>
                        {id ? (
                          <button
                            type="submit"
                            className="btn btn-primary mx-3"
                          >
                            Edit Product
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary mx-3"
                          >
                            Add Product
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={()=>setShowModal(!showModal)}
                        //  onClick={handleModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      </div>
      
    </div>
  );
};
