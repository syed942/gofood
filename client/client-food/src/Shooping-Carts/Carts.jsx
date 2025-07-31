import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const Carts = ({
  item,
  cartItem,
                        setCartItem,
  handleAddToCart,
  key,
  id,
  handleModal,

  setId,
  showModal,
  setShowModal,
  deleteProducts,
}) => {
  
  
    return (
    <div>
      {/* <div className="container">
            <div className="row"> */}

      <div class="card h-100 w-100" style={{ overflow: "auto" }} >
        <div
          class="card-body  d-flex flex-row
     justify-content-between align-items-center"
        >
          <div>
            <img
              src={item.image}
              class="card-img-top "
              alt="..."
              style={{ width: "40px", height: "40px" }}
            />
            <h5 class="card-title">{item.Pname}</h5>
            <p class="card-text">{item.price}</p>
          </div>

          <div
            className="d-flex flex-column justify-content-center 
              align-items-center "
          >
            <button
            data-toggle="tooltip"
            data-placement="top"
            title="Edit Item "
              className="btn btn-sm bg-light mb-3 "
              style={{ width: "150px" }}
              onClick={() => {
                setId(item._id), setShowModal(!showModal);
              }}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="me-2"
                style={{ color: "blue" }}
              />
              
            </button> 
             <button
            data-toggle="tooltip"
            data-placement="top"
            title="Delete Item  "
              className="btn btn-sm btn-light mb-3"
              style={{ width: "150px" }}
              onClick={() => deleteProducts(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} style={{ color: "black" }} />
              
            </button>
            <button
              className="btn btn-sm btn-light"
              data-toggle="tooltip"
              data-placement="top"
              title="Add Item to acrt "
              style={{ width: "150px" }}
              onClick={() => handleAddToCart(item)}
            >
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};
