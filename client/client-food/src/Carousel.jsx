import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Carousel = ({
  handleSearch,
  setSearchText,
  searchText,
  url
}) => {      
    const handleSubmit = async (e) => {  
    //  alert(searchText)
      e.preventDefault(); 
      axios
      .get(`${url}/api/product/search?name=${searchText}`)
      .then((res) => {
                 handleSearch(res.data)      
    })
      .catch((err) => {
        console.error(err)
        toast.error("product not found")
      });   
         }                
  return (
    <div className='wrapper'>
      <div className="main">
      <div id="carouselExample" className="carousel slide" 
      data-bs-ride="carousel" data-bs-interval="3000"
        >
  <div className="carousel-inner" id="carousel" 
  style={{objectFit:"contain !important"}}
  >
    <div className='carousel-caption' style={{zIndex:"10"}}>
  <form class="d-flex"  
  onSubmit={handleSubmit}
  >
               <input 
         className="form-control me-2"
         type="search"
         placeholder="Search name of product"
        // name={searchText}
        // aria-label="Search"
         value={searchText}
         onChange={(e)=>setSearchText(e.target.value)}       
        />
        <button class="btn btn-secondary" type="submit">
        <FontAwesomeIcon icon={faSearch} className="me-2" 
        style={{color:"white"}}
        />
        </button>
      </form></div>
    <div className="carousel-item active object-fit-contain" >
        {/* <div className='container'> */}
        <img src="../images/pizza.jpg" 
      className="d-block  w-100 " alt="..."       
       style={{ height: "700px" }}
      />      
    </div>
    <div className="carousel-item active object-fit-contain" >
        {/* <div className='container'> */}
        <img src="../images/robinstick.jpg" 
      className="d-block  w-100 " alt="..."       
       style={{ height: "700px" }}
      />      
    </div>
    chappati.jpg
    <div className="carousel-item active object-fit-contain" >
        {/* <div className='container'> */}
        <img src="../images/chappati.jpg" 
      className="d-block  w-100 " alt="..."       
       style={{ height: "700px" }}
      />      
    </div>
    <div className="carousel-item active object-fit-contain" >
        {/* <div className='container'> */}
        <img src="../images/juligarlic.jpg" 
      className="d-block  w-100 " alt="..."       
       style={{ height: "700px" }}
      />      
    </div>
    <div className="carousel-item object-fit-contain">
      <img src="../images/roll.jpg" className="d-block w-100 " 
      style={{ height: "700px" }}
      alt="..." />
    </div>
    <div className="carousel-item object-fit-contain">
      <img src="../images/bbq.jpg" className="d-block  w-100 " 
      style={{ height: "700px" }}
      alt="..." />
    </div>  
  <button className="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon text-danger" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next " type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
      </div>
      
    </div>
  )
}
