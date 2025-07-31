import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { OrderPaginate } from './OrderPaginate';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
export const OrderList = () => {
   const navigate=  useNavigate()
  useEffect(()=>{
       navigate("/orderlist?limit=5&&offset=0")
  },[])
 // const [listorder,setList] = ([])
  const [list, setList] = useState([]);
  const url = "http://localhost:5000";
  const fetchData = async () => {
    const api = await axios.get(`${url}/orders`, {
      Headers: {
        "content-type": "application/json",
      },
    });
    setList(api.data.order);
  };
  const deleteOrders = async (orderId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      console.log("Deleted orders:", res.data);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(list)   
  return (
    <>
     <div className='wrapper '
     style={{height:"100vh"}}
     >
      <div className="main">
        <OrderPaginate 
        items={list}
        deleteOrders={deleteOrders}
        />      
      </div>      
    </div>
   <Footer />
    </>
   
  )
}
