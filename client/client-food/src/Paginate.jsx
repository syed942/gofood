import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import QueryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Badge from '@mui/material/Badge';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer} from '@mui/material'
import { Carts } from "./Shooping-Carts/Carts";
function Items1({
  showModal,
  setShowModal,
  initialPage,
  products,
  url,
  setProducts,
  reload,
  setReload,
  setId,
  deleteProducts,
  id,
  handleModal,
  // showModal,
}) {
  console.log("items from items1 are", products);
  const loc = useLocation();
  // const history=useHistory()
  console.log("location from products", loc.pathname);
  const { search } = loc;
  console.log("search from products", search);
  const query = QueryString.parse(search);
  console.log("query limitist from paginate", query?.limit);
  console.log("query object from products", query);
  // const navigate=useNavigate()
  const navigate = useNavigate();
 // const [data, setData] = useState([...products]);
  const [currentItems, setCurrentItems] = useState([...products]);
  // const [openDrawer,setOpenDrawer]=useState(false)
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [cartOpen,setCartOpen]=useState(false);
  const [cartItem,setCartItem]= useState([]);
  const [counter, setCouter] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openDrawer,setOpenDrawer]=useState(false)
  console.log("currentPage", currentPage);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [forcePage, setForcePage] = useState(0);
  //const [data,setData]= useState([...items])
 // console.log(data);
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  useEffect(() => {
    navigate("/products?limit=5&&offset=0");
  }, []);
  const handleLimit = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
    setItemOffset(0);
    setItemsPerPage(e.target.value);
    setForcePage(0);
    setCurrentPage(0);
  };
  const handlePageClick = (event) => {
    let selected = event && event.selected;
    console.log(event.selected);
    console.log(selected);
    setForcePage(selected);
    const newOffset = parseInt(selected) * limit;
    console.log("newOffset", newOffset);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    navigate({
      pathname: "/products",
      search:
        "?" +
        new URLSearchParams({ limit: limit }).toString() +
        "&&" +
        new URLSearchParams({ offset: newOffset }).toString(),
    });
  };
  useEffect(() => {
    changeUrl();
  }, [limit]);
  const changeUrl = () => {
    navigate({
      pathname: "/products",
      search:
        "?" +
        new URLSearchParams({ limit: limit }).toString() +
        "&&" +
        new URLSearchParams({ offset: itemOffset }).toString(),
    });
  };
  useEffect(
    (e) => {
      // Fetch items from another resources.
      const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      console.log(endOffset);
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      const current = products;
      console.log(current);
      console.log(products.slice(itemOffset, endOffset));
      //const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      setCurrentItems(products.slice(itemOffset, endOffset));
      setCurrentItems(products.slice(5, 10));
      setPageCount(Math.ceil(products.length / limit));
    },
    [products]
  );
  useEffect(
    (e) => {
      // Fetch items from another resources.
      const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      console.log(endOffset);
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      // const current = products;
      // console.log(current);
      console.log(products.slice(itemOffset, endOffset));
      setCurrentItems(products.slice(itemOffset, endOffset));
      //setCurrentItems(items.slice(5, 10));
      setPageCount(Math.ceil(products.length / limit));
    },
    [itemOffset, limit, currentItems, itemsPerPage]
  );
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
  console.log("handle model is", handleModal);
  const CalculateTotal1=(items) => 
    items.reduce((ack,item)=> ack + item.amount ,0);
  // const TotalQuantity=(items) => 
  //   items.reduce((ack,item)=> ack + item.amount ,0);
  // const [cartOpen,setCartOpen]=useState(false);
  // const [cartItem,setCartItem]= useState([]);
   // console.log(data)
    const handleAddToCart=(clickedItem)=>{
    //  setOpenDrawer(true)
      setCartItem(prev=>{
        const isItemInCart=prev.find(item=>item.productId===clickedItem.productId)
        if(isItemInCart){
          return prev.map(item=> item.productId===clickedItem.productId?{...item,amount:item.amount +1}: item
          );
        }
        return [...prev,{...clickedItem,amount:1}]
      })
    }
    const handleRemoveFromCart=(id)=>{
      setCartItem(prev => prev.reduce((ack,item)=>{
      if(item.productId===id){
        if(item.amount===1)  return ack;
        return [...ack,{...item,amount:item.amount -1}];
      }  else {
        return [...ack,item];
      }
      },[] )
      
      )
      
      
      
        }

  return (
    // <div>
      
      <div className="wrapper">
        <div className="main">
        <header >
        <IconButton aria-label="cart" onClick={()=>setOpenDrawer(true)}>
        <Badge badgeContent={CalculateTotal1(cartItem).toFixed(0)} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
          
        </header>
        
        <div class="container-fluid p-0 mt-4 ">
        <div class="row p-0">
          {currentItems?.map((el) => (
            
           
              
            <div class="col-md-4 mb-4 table-responsive">
          
              <div class="card h-100 w-100" style={{ overflow: "auto" }}>
                                <div
                  class="card-body  d-flex flex-row
         justify-content-between align-items-center"
                >
                  <div>
                    <img
                      src={el?.image}
                      class="card-img-top "
                      alt="..."
                      style={{ width: "40px", height: "40px" }}
                    />
                    <h5 class="card-title">{el?.Pname}</h5>
                    <p class="card-text">{el?.price}</p>
                  </div>

                  <div className="d-flex flex-column justify-content-center 
                  align-items-center ">
                    <button
                      className="btn btn-sm bg-light mb-3 "
                      style={{ width: "150px" }}
                      onClick={() => {
                        setId(el?._id), setShowModal(!showModal);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        className="me-2"
                        style={{ color: "blue" }}
                      />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-light mb-3"
                      style={{ width: "150px" }}
                      onClick={() => deleteProducts(el._id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "black" }}
                      />
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-light"
                      style={{ width: "150px" }}
                      onClick={handleAddToCart}
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                      Add To Cart
                    </button>                    
                  </div>            
                  
    
  
                  
                </div>
              </div>             
              
            </div>        

            

            
           
            )  )
        }
        </div>
      </div> 
    
      <div>
        <ul
          className="d-flex flex-wrap justify-content-center"
          style={{ marginTop: "100px", listStyle: "none" }}
        >
          <li style={{ position: "relative", top: "10px", left: "-20px" }}>
            <select
              style={{ height: "50px" }}
              //  value={limit}
              name="limit"
              //  placeholder={placeholder}
              onChange={(e) => handleLimit(e)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </li>
          <li
          //style={{ position: "relative", top: "10px" }}
          >
            <div>
              <ReactPaginate
                // className='d-flex flex-wrap p-0'
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLabel="..."
                nextLabel=">"
                itemsPerPage={itemsPerPage}
                onPageChange={(event) => handlePageClick(event)}
                pageRangeDisplayed={null}
                forcePage={forcePage}
                pageCount={pageCount}
                previousLabel="<     "
                renderOnZeroPageCount={null}
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          </li>
        </ul>
      </div>
     

        </div>
      {/* </div> */}
       
      
    </div>
  );
}
export const Paginate = ({
  showModal,
  setShowModal,
  handleModal,
  reload,
  url,
  initialPage,
  setReload,
  products,
  setProducts,
  id,
  setId,
  deleteProducts,
}) => {
  console.log("items from paginate", products);
  console.log("reload from paginate", reload);
  console.log("url from paginate", url);
  console.log("initialPage from paginate", initialPage);
  return (
    // <div>Paginate by react-paginate</div>
    <div>
      <Items1
        showModal={showModal}
        setShowModal={setShowModal}
        handleModal={handleModal}
        products={products}
        initialPage={initialPage}
        deleteProducts={deleteProducts}
        reload={reload}
        setId={setId}
        url={url}
        id={id}
        setReload={setReload}
        setProducts={setProducts}
      />
    </div>
  );
};
