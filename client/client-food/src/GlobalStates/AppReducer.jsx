
import React from 'react';
 
export default (state, action) => {
 //   console.log("pay load",action.payload)
 // console.log("remove",state.shoppingList.filter(item => item !== action.payload))// filter items not to be deleted
  //action.pay load containes item to be deleted
   switch(action.type) {
    case 'GET_PRODUCTS_SUCCESS':
        return {
           
            ...state,
            items:state.cartItems
        }
    case 'ADD-ITEM' :
        return {
            
                     items: [action.payload, ...state.cartItems]
                              
                

        }
        // default:
        //     return state;
            
            
               
            
    }
}
