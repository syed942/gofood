import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";
import { Navbar1 } from "./NavBar1";
import { AddProduct } from "./AddProduct";
import {useLocation,useNavigate} from 'react-router-dom'
import QueryString from "query-string";
export const Product = ({searchText,products ,setProducts}) => {
  useEffect(()=>{
    navigate("/products?limit=5&&offset=0")
  },[])
   console.log("searchText from Prodcuts",searchText)
   const loc = useLocation();
  // const history=useHistory()
  console.log("location from products",loc.pathname);
  const { search } = loc;
  console.log("search from products", search)
  const query=QueryString.parse(search)
  
  console.log("query object from products",query)

  //const [products, setProducts] = useState([]);
  const [limit,setLimit] = useState(query?.limit)
  const [currentItems, setCurrentItems] = useState([]);
  console.log("limit from product is",query?.limit)
  console.log("offset from product is",query.offset)
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");
  const navigate=useNavigate()
  
  console.log("array of products state", products);
//   useEffect(()=>{
//     searchuser()
//    },[searchText])
//    const searchuser=()=>{
//     const filtered = products.filter(p =>p.Pname===searchText       
//       );
//       console.log("fileterd from contact1 is",filtered)
//       setProducts(filtered)
  
//    }
  //console.log("searchText from product.jsx is",searchText)
  
  const fetchData = async () => {
    const api = await axios.get(`${url}/products`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    setProducts(api.data.product);
  };
  useEffect(() => {
    fetchData();
  }, [reload]);
  
  const handleModal = () => {
    setShowModal(!showModal);
  };
  console.log("id is=", id);
  const deleteProducts = async (id) => {
    const api = await axios.delete(`${url}/del/${id}`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    setReload(!reload);
    toast.success("product deleted successfully");
  };
  const handleSearch1 = (data) => {
    let array = [data];
    setProducts(array);
  };
  const url = "http://localhost:5000";
  return (
    <div>
      {/* <Navbar1 handleSearch1={handleSearch1} /> */}
      <AddProduct
        handleModal={handleModal}
        showModal={showModal}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        products={products}
        setId={setId}
      />
      <ToastContainer position="top-right" autoClose={3000} />
      <div class="container mt-4 ">
      <div class="row">
        {
          products.map((el)=>(
            
    <div class="col-md-4 mb-4 table-responsive">
      <div class="card h-100 w-100" style={{overflow:"auto"}}>
        {/* <div> */}
        {/* <div> */}
        <div  class="card-body  d-flex flex-row
         justify-content-between align-items-center">
          
          <div>
        <img src={el.image} class="card-img-top " alt="..." 
        style={{width:"40px",height:"40px"}}/>
       
       <h5 class="card-title">{el.Pname}</h5>
       <p class="card-text">{el.price}</p>

        </div>
        <div className="d-flex flex-column justify-content-center align-items-center ">
                    <button className="btn btn-sm btn-primary mb-3 " style={{width:'150px'}}
              onClick={()=>{setId(el._id),handleModal()}}
              >Edit</button>
              <button
                className="btn btn-sm btn-danger mb-3" style={{width:'150px'}}
                onClick={() => deleteProducts(el._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-success" style={{width:'150px'}}
                             >
                Add To Cart
              </button>
          
        </div>
         
     
      </div>
     
        
        </div>
      {/* </div> */}
    </div>

    

    
  

          ))
        }
        </div>
  
</div>

      {/* {products.map((el) => {
        console.log(el.image);
        return (
        
          <div
            key={el._id}
            className=" bg-dark text-white p-3 my-3 w-100 w-lg-50
            d-flex justify-content-between align-items-center
            "
            style={{
              border: "2px solid yellow",
              borderRadius: "30px",
              // width: "500px",
            }}
          >
            <div className="w-30">
              <div className="d-flex justify-contant-center align-items-center">
                <div className="mx-3 mb-3">
                  <img
                    src={el.image}
                    alt="ll"
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>
                <div>
                  <h2>{el.Pname}</h2>
                </div>
              </div>
              <h4>{el.price}</h4>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button className="btn btn-lg btn-primary me-3"
              onClick={()=>{setId(el._id),handleModal()}}
              >Edit</button>
              <button
                className="btn btn-lg btn-danger"
                onClick={() => deleteProducts(el._id)}
              >
                Delete
              </button>
            </div>
          </div>

       
          
        
          
        );
      })} */}
    </div>
  );
};
