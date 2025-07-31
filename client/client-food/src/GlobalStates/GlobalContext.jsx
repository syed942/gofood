import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios'
import { useEffect } from 'react';
const data=[{id:1,name:"asad",city:"lahore"},{id:2,name:"asad shsh",city:"lahore"}]
const initialState = {
 //  shoppingList : [{id:1,name:"asad",city:"lahore"},{id:2,name:"asad shsh",city:"lahore"}],
  //cartItems : [],
//  products: null,
   adminUser:"ishfaq@mern.com",
   adminPassword:"admin",
  // adminOk:null
 //  counter:33
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
   

    
   const [state, dispatch] = useReducer(AppReducer, initialState);
   
  
   

   return(
      <GlobalContext.Provider value = {{
       
       userName:state.adminUser,
       passwordAdmin:state.adminPassword,
      
       
       }}> 
        {children} 
   </GlobalContext.Provider>
   )
}