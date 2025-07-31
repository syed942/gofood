import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
export const OrderMe2 = () => {
  const url="http://localhost:5000"
  const [updates, setUpdates] = useState([
    JSON.parse(localStorage.getItem("updates")),
  ]);
  const [showModal, setShowModal] = useState(true);
  console.log(updates);
  const storedUser = JSON.parse(localStorage.getItem("updates"));
  // console.log(storedUser)
  useEffect(() => {
    setUpdates(storedUser);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/orderme2");
  }, []);

  const CalculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.quantity * 
  item.unitPrice, 0);
  const GrossTotal = CalculateTotal(updates).toFixed(2);
  const ids = updates.map((item) => item._id);
  const oids=updates.map((item)=> item.orderId)
  const cnames=updates.map((item)=> item.name)
  const address=updates.map((item)=> item.address)
  const phones=updates.map((item)=> item.phone)
  const oDate=updates.map((item)=> item.orderDate)
  const names = updates.map((el) => el.Pname);
  const quantities = updates.map((el) => Number(el.quantity));
  const prices = updates.map((el) => Number(el.unitPrice));
  const amounts = updates.map((el) => el.quantity * el.unitPrice);
  console.log(" order Ids list items ids", oids);
  console.log("Ids list items ids", ids);
  console.log("names list items ids", names);
  console.log("prices list items ids", prices);
  console.log("quantities list items ids", quantities);
  console.log("amounts list items ids", amounts);
  const Total_Items = updates.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  console.log(Total_Items)
  // below is first method to update an order in database
  const HandleSubmit = (e) => {
    e.preventDefault();
    // console.log("form submitted");
    axios.delete(`http://localhost:5000/api/orders/${oids[0]}`);
    const formData = new FormData();
    formData.append("name", cnames[0]);
    formData.append("orderId", oids[0]);
    formData.append("address", address[0]);
    formData.append("phone", phones[0]);
    formData.append("orderDate", oDate[0]);
       for (let i = 0; i < ids.length; i++) {
      if (i !== ids?.length - 1) {
        formData.append("orderAmount", 0);
      } else {
        formData.append("orderAmount", GrossTotal);
      }
      formData.append("Pname", names[i]);
      formData.append("quantity", quantities[i]);
      formData.append("unitPrice", prices[i]);
      formData.append("amount", amounts[i]);
      axios
      .put(`${url}/editorder`, formData)
      .then((res) => {
        console.log(res.data);
        //  toast.success("order updated");
        setShowModal(!showModal);
        // window.location.reload(true);
      })
      .catch((err) => console.error("❌ Order failed:", err));
  }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      toast.success("order updated");
    setShowModal(false);
  };
  // second method to update an order in database
  const HandleSubmit1 = (e) => {
    e.preventDefault();
    // console.log("form submitted");
   // axios.delete(`http://localhost:5000/api/orders/${oids[0]}`);
    const formData = new FormData();
   // formData.append("name", cnames[0]);
   // formData.append("orderId", oids[0]);
   // formData.append("address", address[0]);
  //  formData.append("phone", phones[0]);
   // formData.append("orderDate", oDate[0]);
   
   // for (let i = 0; i < ids.length; i++) {
      // if (i !== ids?.length - 1) {
      //   updates.push(0);
      // } else {
      //   updates.push( parseInt(GrossTotal));
      // }
      // updates.push( names[i]);
      // updates.push( parseInt(quantities[i]));
      // updates.push( parseInt(prices[i]));
      // updates.push( parseInt(amounts[i]));
      console.log("updates",updates)
      axios.put(`${url}/api/orders/${oids[0]}`, updates , {
        headers: {
          "Content-Type": "application/json"
        }
      })
      //     axios
      // .put(`${url}/api/orders/${oids[0]}`,`${updates}` )
      // .then((res) => {
      //   console.log(res.data);
      //   //  toast.success("order updated");
      //   setShowModal(!showModal);
      //   // window.location.reload(true);
      // })
      // .catch((err) => console.error("❌ Order failed:", err));
 // }
  //     axios
  //     .put(`${url}/editorder`, formData)
  //     .then((res) => {
  //       console.log(res.data);
  //       //  toast.success("order updated");
  //       setShowModal(!showModal);
  //       // window.location.reload(true);
  //     })
  //     .catch((err) => console.error("❌ Order failed:", err));
  // }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      toast.success("order updated");
    setShowModal(false);
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
                <h1 className="modal-title ">Edit Order</h1>
              </div>
              <div className="modal-body">
                <form onSubmit={HandleSubmit}>
                  <div className="mb-3 text-start">
                    {updates.map((el, index) => {
                      return (
                        <div key={el._id}>
                          <label htmlFor="pname" className="form-label">
                            Pname
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control "
                            name="pname"
                            id="pname"
                            value={el.Pname}
                            onChange={(e) => {
                              const newItems = [...updates];
                              newItems[index].Pname = e.target.value;
                              setUpdates(newItems);
                            }}
                          />
                          <div key={el._id}>
                            <label htmlFor="quantity" className="form-label">
                              Quantity
                            </label>
                            <input
                            type="number"
                              required
                              className="form-control "
                              name="quantity"
                              id="quantity"
                              value={el.quantity}
                              onChange={(e) => {
                                const newItems = [...updates];
                                newItems[index] = {
                                  ...newItems[index],
                                  quantity: Number(e.target.value)
                                };
                                setUpdates(newItems);
                                                              }}
                            />
                          </div>
                          <label htmlFor="price" className="form-label">
                            Price
                          </label>
                          <input
                          type="number"
                            required
                            className="form-control "
                            name="price"
                            id="price"
                            value={el.unitPrice}
                            onChange={(e) => {
                              const newItems = [...updates];
                              newItems[index] = {
                                ...newItems[index],
                                unitPrice: Number(e.target.value)
                              };
                              setUpdates(newItems);
                              // const newItems = [...updates];
                              // newItems[index].unitPrice = e.target.value;
                              // setUpdates(newItems);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="modal-footer 
     my-3
     d-flex justify-content-center align-items-center"
                  >
                    <div>
                      <button type="submit" className="btn btn-primary mx-3">
                        Edit order
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
  }
