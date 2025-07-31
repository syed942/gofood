import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export const OrderMe1 = () => {
  const location = useLocation();
  const { grossTotal, cartItems } = location.state;
  const url = "http://localhost:5000";
  const [orderId, setOrderId] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [maxId, setMaxId] = useState([]);
  console.log("maxID is ", maxId);
  console.log("max is id ", typeof maxId);
  const CalculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);
  const GrossTotal = CalculateTotal(cartItems).toFixed(2);
  const FetchData = async () => {
    await axios.get(`${url}/orders`).then((res) => {
      console.log(res.data?.order);
      setMaxId(res.data?.order);
    });
  };
  useEffect(() => {
    FetchData();
  }, []);
  const oids = maxId.map((el) => {
    return el.orderId;
  });
  //console.log(Math.max[...oids])
  const max = [...oids];
  const orderId1 = max.length > 0 ? Math.max(...max) + 1 : 1;
  const greatestOrderId = Math.max(...max);
  console.log(greatestOrderId);
  console.log("greates order number id", Math.max(...max));
  console.log(typeof max);
  const [OrderForm, setOrderForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderDate, setOrderdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [orderMsg, setOrderMsg] = useState(false);
  const ids = cartItems.map((item) => item._id);
  const names = cartItems.map((el) => el.Pname);
  const quantities = cartItems.map((el) => el.quantity);
  const prices = cartItems.map((el) => el.price);
  const amounts = cartItems.map((el) => el.quantity * el.price);
  console.log("Ids list items ids", ids);
  console.log("names list items ids", names);
  console.log("quantities list items ids", quantities);
  console.log("amounts list items ids", amounts);
  const Total_Items = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", OrderForm.name);
    // greatestOrderId
    formData.append("orderId", orderId1);
    // formData.append("orderId", Math.max(...max) + 1);
    formData.append("address", OrderForm.address);
    formData.append("phone", OrderForm.phone);
    // formData.append("orderAmount", grossTotal);
    formData.append("orderDate", orderDate);
    // formData.append("orderAmount", grossTotal);
    for (let i = 0; i < ids.length; i++) {
      if (i !== ids?.length - 1) {
        formData.append("orderAmount", 0);
      } else {
        formData.append("orderAmount", grossTotal);
      }
      formData.append("Pname", names[i]);
      formData.append("quantity", quantities[i]);
      formData.append("unitPrice", prices[i]);
      formData.append("amount", amounts[i]);
      axios
        .post(`${url}/addorder1`, formData)
        .then((res) => {
          console.log(res.data);
          // toast.success("order added");
          setShowModal(!showModal);
          // window.location.reload(true);
        })
        .catch((err) => console.error("❌ Order failed:", err));
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    toast.success("order added");
  };
  const HandleChange = (e) => {
    setOrderForm({ ...OrderForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {showModal && (
        <div className="modal d-block" role="dialog" tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div
              className="modal-content bg-dark text-white"
              style={{ border: "2px solid yellow" }}
            >
              <div className="modal-header d-flex justify-content-center align-items-center">
                <h1 className="modal-title ">Add Order</h1>
                {/* <button type="button" class="btn-close"  aria-label="Close"></button> */}
              </div>
              <div className="modal-body">
                <form onSubmit={HandleSubmit}>
                  <div className="mb-3 text-start">
                    <label htmlFor="cname" className="form-label ">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      // required
                      value={OrderForm.name}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="address"
                      id="address"
                      value={OrderForm.address}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="phone" className="form-label">
                      Phone #
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="phone"
                      id="phone"
                      value={OrderForm.phone}
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="date" className="form-label">
                      order Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      name="odate"
                      id="date"
                      value={orderDate}
                      onChange={(e) => setOrderdate(e.target.value)}
                    />
                  </div>

                  <div
                    className="modal-footer 
              my-3
              d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <button type="submit" className="btn btn-primary mx-3">
                        Add order
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary mx-3"
                        onClick={() => setShowModal(!showModal)}
                      >
                        {" "}
                        cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
