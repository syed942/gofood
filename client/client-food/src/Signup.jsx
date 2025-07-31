import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export const Signup = ({}) => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();    
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phone", phone);
    formdata.append("image", image);
    try {
      const api = await axios.post(`${url}/`, formdata, {
        Headers: {
          "content-type": "application/json",
        },
      });
      toast.success(`acoount created successfully!`);
      setShowModal(!showModal);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      navigate("/login1");
    } catch (err) {
      if (
        err.response &&
        err.response.data.message === "Contact already exists"
      ) {
        toast.error("❗ Email already exists,please enter different email");
      } else {
        toast.error("Something went wrong");
      }
    }
    // }
  };
  return (
    <div className="wrapper">
      <div className="main">
        {/* Modal Code  */}
        {showModal && (
          <div className="modal d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-dark text-white"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header d-flex justify-content-center align-items-center">
                  <h1 className="modal-title ">Sign up</h1>
                  {/* <button type="button" class="btn-close"  aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <form onSubmit={submitHandler}>
                    <div className="mb-3 text-start">
                      <label htmlFor="name" className="form-label ">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="nameC"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        name="emailc"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>

                      <input
                        type="password"
                        required
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phonec"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="phone" className="form-label">
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
                      <div>
                        <button type="submit" className="btn btn-primary mx-3">
                          Add Contacts
                        </button>

                        {/* <button
               type="button"
               className="btn btn-danger"
              
              
             >
               Cancel
             </button> */}
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
  );
};
