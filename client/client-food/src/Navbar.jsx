import React, { useState, useEffect } from "react";
import axios from "axios";
import QueryString from "query-string";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import { useGlobalContext } from "./GlobalStates/GlobalContext";
export const Navbar = ({ handleSearch, Logout, searchText, setSearchText }) => {
  const navigate = useNavigate();
  const loc = useLocation();
  console.log("location from contacts2", loc);
  const { search } = loc;
  const query = QueryString.parse(search);
  console.log("limit is ", query?.limit);
  console.log("offest is ", query?.offset);
  //const [currentItems, setCurrentItems] = useState([query?.limit]);

  const [searchTerm, setSearchTerm] = useState("");
  console.log("searchText from Navbar2.jsx", searchText);
  const url = "http://localhost:5000";

  const handleSubmit = async (e) => {
    console.log("serachText from navbar2 is", searchText);
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
    } else if (api1.data.contact) {
      handleSearch(api1.data.contact);
    } else {
      toast.error("seracht item not found ");
    }
  };
  const Contacts = () => {
    navigate({
      pathname: "/",
      search: "?limit=5&&offset=0",
      window,
    });
    // localStorage.removeItem("login");
    // window.location.reload(true);
  };
  // const Products1 = () => {
  //   navigate({
  //     pathname: "/products",
  //     search: "?limit=5&&offset=0",
  //   });
  // };
  const orderList = () => {
    navigate({
      pathname: "/orderlist",
      search: "?limit=5&&offset=0",
    });
  };

  //// to={`/?limit=${query?.limit}&&offset=${query?.offset}`}>
  //   Home</Link> |{" "}
  //to="/?limit=5&&offset=0"
  return (
    <div className="wrapper">
      <div className="main">
        <nav className="navbar navbar-expand-lg bg-body-tertiary pb-3 ">
          <div className="container-fluid p-0 ">
            <Link className="navbar-brand ">
              <FastfoodIcon fontSize="large" 
              style={{ color: "#ff9800" }} />
           {/* <img src="../images/logoFood.jpg" alt="logo" 
           style={{width:"50px",height:"50px"}} /> */}
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/?limit=5&&offset=0");
                    window.location.reload(true);
                  }}
                >
                  <Link className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/about");
                    window.location.reload(true);
                  }}
                >
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/about"
                    // onClick={Logout}
                  >
                    AboutUs
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/contactus");
                    window.location.reload(true);
                  }}
                >
                  <Link className="nav-link active" aria-current="page">
                    ContactUs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login1"
                    onClick={Logout}
                  >
                    Logout
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/products2?limit=5&&offset=0");
                    window.location.reload(true);
                  }}
                >
                  <Link className="nav-link">Products</Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    navigate("/orderlist?limit=5&&offset=0");
                    window.location.reload(true);
                  }}
                >
                  <Link className="nav-link">Orders List</Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mange Orders
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
                </li> */}
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
                <button className="btn btn-light" type="submit">
                  <FontAwesomeIcon icon={faSearch} className="me-2" />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
