import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import QueryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Drawer } from "@mui/material";
import { Carts } from "./Shooping-Carts/Carts";
import { CartItem } from "./Shooping-Carts/CartItem";
const data = [
  {
    _id: "1",
    Pname: "Burger",
    price: 120,
    image: "../images/bbq.jpg",
  },
  {
    _id: "2",
    Pname: "Pizza",
    price: 300,
    image: "https://via.placeholder.com/80",
  },
];
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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [counter, setCouter] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  console.log("currentPage", currentPage);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
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
      const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      console.log(endOffset);
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      console.log(products.slice(itemOffset, endOffset));
      setCurrentItems(products.slice(itemOffset, endOffset));
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
  // const subtotal = Number(item.price) * Number(item.quantity);
  const total = (items) => items.reduce((acc, item) => acc + item.quantity, 0);
  const CalculateTotal1 = (items) =>
    items.reduce((ack, item) => Number(ack) + Number(item.amount), 0);
  const handleAddToCart = (clickedItem) => {
    setCartItem((prevCart) => {
      const exists = prevCart.find((item) => item._id === clickedItem._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === clickedItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...clickedItem, quantity: 1 }];
      }
    });
  };
  const handleRemoveFromCart = (id) => {
    setCartItem((prev) =>
      prev.reduce((ack, item) => {
        if (item._id === id) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const CalculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.quantity * item.price, 0);
  return (
    <>
      <div className="wrapper">
        <div className="main">
          <header>
            <IconButton aria-label="cart" onClick={() => setOpenDrawer(true)}>
              <Badge
                badgeContent={total(cartItem).toFixed(0)}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </header>
          <div>
            <div className="wrapper">
              <div className="main">
                <div className="container-fluid p-0 ">
                  <div className="row p-0">
                    {currentItems?.map((el) => (
                      <div class="col-md-4 mb-4 table-responsive">
                        <Carts
                          item={el}
                          key={el._id}
                          cartItem={cartItem}
                          setCartItem={setCartItem}
                          //  handleAddToCart={() => handleAddToCart(el)}
                          handleAddToCart={handleAddToCart}
                          id={id}
                          setId={() => setId(el._id)}
                          handleModal={handleModal}
                          showModal={showModal}
                          setShowModal={setShowModal}
                          deleteProducts={() => deleteProducts(el._id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul
                className="d-flex flex-wrap justify-content-center"
                style={{ marginTop: "100px", listStyle: "none" }}
              >
                <li
                  style={{ position: "relative", top: "10px", left: "-20px" }}
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
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <CartItem
          cartItems={cartItem}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          CalculateTotal={CalculateTotal}
        />
      </Drawer>
    </>
  );
}
export const Paginate1 = ({
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
