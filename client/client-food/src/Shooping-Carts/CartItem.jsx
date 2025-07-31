import React, { useState } from "react";
import { OrderItem } from "./OrderItem";
import { useNavigate } from "react-router-dom";
export const CartItem = ({
  cartItems,
  addToCart,
  removeFromCart,
  CalculateTotal,
}) => {
  const navigate=useNavigate()
  const TotalQuantity = (items) =>
    items.reduce((ack, item) => ack + parseInt(item.quantity), 0);
  const Gross= CalculateTotal(cartItems)
 
 
  const GetOrder=()=>{
    
  //const handlePlaceOrder = () => {
    navigate("/order", {
      state: {
        cartItems,
        grossTotal: Gross,
      
      }
    });
window.location.reload(true)
     
    
    }
    const GetOrder1=()=>{
    
      //const handlePlaceOrder = () => {
        navigate("/order1", {
          state: {
            cartItems,
            grossTotal: Gross,
          
          }
        });
    window.location.reload(true)
         
        
        }
 
  return (
    <div>
      {cartItems.length === 0
        ? "cart empyt"
        : cartItems?.map((el) => (
            <OrderItem
              item={el}
              key={el._Id}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
      <div>
        <div className="ps-0 ps-md-4  fs-5 d-flex flex-row justify-contents-around align-items-center">
          <p className="mx-3 text-success">Total Items: {TotalQuantity(cartItems)}</p>
          <p className="text-success">Gross Total:${CalculateTotal(cartItems)}</p>
        </div>
        <div>
          <button
          className="btn btn-lg btn-light w-100"
          // onClick={()=>GetOrder()}>Order Now</button>
        onClick={()=>GetOrder1()}>Order Now</button>
        </div>
      </div>
    </div>
  );
}

