import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Footer } from './Footer';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
export const ContactUs = () => {
  const url="http://localhost:5000"
     const [qname,setName] =    useState("")
     const [email,setEmail] =    useState("")
     const [message,setMessage] =    useState("")
     const handleSubmit=async(e)=>{
      e.preventDefault()
      const formData = new FormData();
      formData.append("qname", qname);
      formData.append("email", email);
      formData.append("message", message);
    
      try {
        const res = await axios.post("http://localhost:5000/addqueries", formData);
        console.log(res.data);
        toast.success("query submitted")
      } catch (err) {
        console.error("Error sending query:", err.response?.data || err.message);
      }
   
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
    //}
    // }
  return (
    <>
     <div className='wrapper '
      style={{height:"100vh"}}
     >
      <div className="main">
      <div className="container-fluid py-5">
      <h2 className="text-center ">Contact Us</h2>

      <div className="row mb-5">
        <div className="col-md-6 ">
          <h5>Get in Touch</h5>
          <p><FontAwesomeIcon icon={faEnvelope} /> Email: info@foodexpress.pk</p>
          <p><FontAwesomeIcon icon={faPhone} /> Phone: +92 300 1234567</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> Location: Gulberg III, Lahore, Pakistan</p>
        </div>

        <div className="col-md-6">
          <h5>Send Us a Message</h5>
          <form className='mb-3' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor='qname'>Your Name</label>
              <input type="text"
              id="qname"
              name="qname"
              value={qname}
              onChange={(e)=>setName(e.target.value)}
              className="form-control" placeholder="Enter your name" required />
            </div>
            <div className="mb-3">
              <label className="form-label"
              htmlFor='email'
              >Your Email</label>
              <input type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control" placeholder="Enter your email"
               required />
            </div>
            <div className="mb-3">
              <label className="form-label"
              htmlFor='message'
              >Message</label>
              <textarea className="form-control"
              id="message"
              name="message"

              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              rows="4" placeholder="Your message..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
   
  
      </div>
      </div>
      
    <Footer />
    
      
    </>
   
 
    
  )
}
