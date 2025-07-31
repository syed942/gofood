import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const OrderItem = ({ item, key, addToCart, removeFromCart }) => {
  console.log(item);
  const [amount, setamount] = useState(item.quantity * item.price);
  const [pid, setPid] = useState(item._id);
  const [quantity, setQuantity] = useState(item.quantity);
  const navigate = useNavigate();
  const ConfirmOrder=()=>{
   
    navigate('/orderconfirm',{state:{Amount:amount,Pid:pid,Quantity:quantity}})
   }
  useEffect(() => {
    setQuantity(item.quantity);
    setamount(item.quantity * item.price);
  }, [quantity]);
  return (
    <div className="p-5 w-25">
      <div className="card p-4 mb-3" style={{ width: "14rem" }} key={key}>
        <img
          src={item.image}
          className="card-img-top"
          alt="..."
          style={{ width: "100px", height: "100px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.Pname}</h5>
          <p className="card-text">Price ${item.price}</p>
          <p className="card-text">Amount ${amount}</p>
          <p className="card-text">Quantiry {quantity}</p>
          <div className="d-flex flex-row justify-content-center align-items-center">
            <button
              className="px-3 fs-5 btn btn-md text-danger btn-light"
              onClick={() => {
                const newQuantity = item.quantity - 1;
                setQuantity(newQuantity);
                setamount(newQuantity * item.price), removeFromCart(item._id);
              }}
            >
              -
            </button>
            <div className="px-3 fs-4">{quantity}</div>
            <button
              className="fs-5 btn btn-md  text-success btn-light"
              onClick={() => {
                const newQuantity = item.quantity + 1;
                setQuantity(item.quantity + 1);
                setamount(newQuantity * item.price);
                addToCart(item);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
