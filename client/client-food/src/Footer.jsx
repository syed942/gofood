import React from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
export const Footer = () => {
  return (
    <div className='wrapper'>
        <div className="main">
        <footer className="bg-dark text-white text-center text-lg-start mt-5">
  <div className="container-fluid w-100 p-4">
    <div className="row">
     
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">
        <FastfoodIcon fontSize="large" style={{ color: "#ff9800" }} />
        </h5>
        <ul className="list-unstyled mb-0">
          <li><a href="/about" className="text-white">About Us</a></li>
          <li><a href="/contactus" className="text-white">Contact Us</a></li>
          {/* <li><a href="#!" className="text-white">Press</a></li> */}
        </ul>
      </div>

     
      <div className="col-lg-4 col-md-6 mb-4 mb-md-0 ">
        <h5 className="text-uppercase">Support</h5>
        <ul className="list-unstyled mb-0">
          <li><div className="text-white d-flex 
          flex-row  aign-items-center         
          ">
            <div className='me-2 text-start p-0'>
            <FontAwesomeIcon icon={faEnvelope} />   </div>
            <div> info@foodexpress.pk</div>
            </div></li>
          <li>
          <div className="text-white d-flex 
          flex-row  aign-items-center         
          ">
             
            
            <div className='me-2 text-start p-0'>
            <FontAwesomeIcon icon={faPhone} />    </div>
            <div>  +92 300 1234567</div>
            </div>
          </li>
          <li>
          <div className="text-white d-flex 
          flex-row  align-items-center         
          ">
            <div className='me-2 text-start p-0'>
            <FontAwesomeIcon icon={faLocationDot} />   </div>
            <div>15-A Gulber-III Lahore, Pakistan</div>
            </div>
          </li>
        </ul>
      </div>      
      <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Follow Us</h5>
        <a href="https://www.youtube.com/" className="text-white me-4"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://www.Twitter.com/" className="text-white me-4"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://www.Instagram.com/" className="text-white me-4"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://www.linkedin.com/" className="text-white"><FontAwesomeIcon icon={faLinkedin} /></a>
      </div>
    </div>
  </div>

  <div className="text-center p-3 mb-0 bg-secondary">
    © 2025 FoodExpress. All rights reserved.
  </div>
</footer>

        </div>
        

    </div>
  )
}
