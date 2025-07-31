import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
export const Navbar2 = ({handleSearch ,searchText,setSearchText}) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log("searchText from Navbar2.jsx",searchText)
  const url = "http://localhost:5000";

  const handleSubmit = async (e) => {
    console.log("serachText from navbar2 is", searchText);
    //api/users/searchId?id=686223a9591fa31d5460f732
    console.log(url);
    e.preventDefault();
    const api1 = await axios.get(`${url}/api/users/searchId?id=${searchText}`, {
        Headers: {
          "content-type": "application/json",
        },
      });
    const api = await axios.get(`${url}/searchProduct?id=${searchText}`, {
      Headers: {
        "content-type": "application/json",
      },
    });
   // console.log(api.data.product);
    if (api.data.product) {
      // console.log("navbar data is",api.data.contact)
      handleSearch(api.data.product); // return an object of gicen id
    } else if((api1.data.contact)){
        handleSearch(api1.data.contact)
    }else{
        toast.error("seracht item not found ");
    }      
    }
  //};
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
        <div className="container-fluid ">
          <Link className="navbar-brand" href="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">
                  Disabled
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
