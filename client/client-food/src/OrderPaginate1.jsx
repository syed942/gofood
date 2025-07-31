import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import QueryString from "query-string";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Footer } from "./Footer";
import { OrderMe2 } from "./OrderMe2";
function Items1({
  items,
  deleteOrders,
  SearchOrder
  //   showModal,
  //   setShowModal,
  //   initialPage,
  //   products,
  //   url,
  //   setProducts,
  //   reload,
  //   setReload,
  //   setId,
  //   deleteProducts,
  //   id,
  //   handleModal,
  // showModal,
}) {
  console.log("items from items1 are", items);
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
  const [currentItems, setCurrentItems] = useState([...items]);
  // const [openDrawer,setOpenDrawer]=useState(false)
  const [pageCount, setPageCount] = useState(0);
  const [searchOrder, setSearchOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  console.log("currentPage", currentPage);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  useEffect(() => {
    navigate("/orderlist1?limit=5&&offset=0");
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
      pathname: "/orderlist1",
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
      pathname: "/orderlist1",
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
      const current = items;
      console.log(current);
      console.log(items.slice(itemOffset, endOffset));
      //const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setCurrentItems(items.slice(5, 10));
      setPageCount(Math.ceil(items.length / limit));
    },
    [items]
  );
  useEffect(
    (e) => {
      const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      console.log(endOffset);
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      console.log(items.slice(itemOffset, endOffset));
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / limit));
    },
    [itemOffset, limit, currentItems, itemsPerPage]
  );
  const TotalSale = items?.reduce((sale, item) => {
    return sale + item.amount;
  }, 0);
  console.log("total sale is", TotalSale);
  //   const  EditOrder=(_id,orderId,Pname)=>{
  // //const {_id,Pname,unitPrice} =item; // success code
  // alert(`${_id} ${Pname} ${orderId}`)
  //   }

  const EditOrder = (item) => {
    //e.preventDefault()
    const updates = items.filter((el) => el.orderId === item.orderId);
    //navigate("/orderme2", { state:{updates:updates} });

    navigate("/orderme2");
    localStorage.setItem("updates", JSON.stringify(updates));
    //  localStorage.setItem("updates", JSON.stringify(updates))
    //  navigate("/orderme2",{state:{
    //   updates:updates
    //  }})
    // window.history.replaceState(null, "", "/orderedit");
    //navigate("/orderedit"),{replace:true};

    //window.location.reload(true)

    // alert(`${updates[0].Pname}`)
    // alert(`${updates.map(i => i.Pname).join(", ")}`)
    // alert(`${item_id} ${item.Pname} ${item.orderId}`)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
  };

  return (
    <>
      <div className="wrapper11">
        <div className="main11">
          <div className="container-fluid p-0">
            <div className="card">
              <div
                className="card-header d-flex flex-row 
              justify-content-between align-items-center
              "
              >
                <div>Orders List</div>
                <div>
                  <form
                    className="d-flex"
                    role="search"
                   onSubmit={handleSubmit}
                  >
                    <input
                      className="form-control me-2"
                     // type="search"
                      placeholder="Search order by cell number"
                      aria-label="Search"
                      value={searchOrder}
                      onChange={(e) => setSearchOrder(e.target.value)}
                    />
                    <button className="btn btn-light" type="button"
                    onClick={()=>SearchOrder(searchOrder)}
                    >
                      <FontAwesomeIcon icon={faSearch} className="me-2" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="card-body table-responsive ">
                <form>
                  <table
                    className="table table-bordered table-striped   w-100  "
                    style={{ overflow: "auto" }}
                  >
                    <thead className="table-dark">
                      <tr>
                        <th>Order Id</th>
                        <th>Item</th>
                        <th>Customer</th>
                        <th>unit Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>OrderAmount</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((el) => (
                        <>
                          <tr key={el?._id}>
                            <td>{el?.orderId}</td>
                            <td>{el?.Pname}</td>
                            <td>{el?.name}</td>
                            <td>{el?.unitPrice}</td>
                            <td>{el?.quantity}</td>
                            <td>{el?.amount}</td>
                            <td>{el?.orderAmount}</td>
                            <td className="d-flex flex-column justify-content-center">
                              <div className="w-5 text-center ">
                                <button
                                  className="btn btn-sm    mb-3"
                                  // onClick={EditOrder(el)}
                                  onClick={() => EditOrder(el)}
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    className="me-2"
                                    style={{ color: "blue" }}
                                  />
                                </button>
                              </div>
                              <div
                                className="text-center "
                                //  style={{ width: "150px" }}
                              >
                                <button
                                  className="btn btn-sm  "
                                  onClick={() => deleteOrders(el.orderId)}
                                  style={{ width: "100px" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ color: "black" }}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <ul
                      className="d-flex flex-wrap justify-content-center"
                      style={{ marginTop: "100px", listStyle: "none" }}
                    >
                      <li
                        style={{
                          position: "relative",
                          top: "10px",
                          left: "-20px",
                        }}
                      >
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
                      <li>
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
                </form>
              </div>
              <div className="pe-3 text-end">
                <h3 className="text-success">
                  Total Sale:
                  {TotalSale}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
export const OrderPaginate1 = ({ items, deleteOrders,SearchOrder }) => {
  console.log("items from orderPaginate", items);
  return (
    // <div>Paginate by react-paginate</div>
    <div>
      <Items1 items={items} deleteOrders={deleteOrders}
      SearchOrder={SearchOrder}
      />
    </div>
  );
};
