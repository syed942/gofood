import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { OrderPaginate } from './OrderPaginate';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { OrderPaginate1 } from './OrderPaginate1';
export const OrderList1 = () => {
   const navigate=  useNavigate()
  useEffect(()=>{
       navigate("/orderlist1?limit=5&&offset=0")
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
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  
    if (confirmDelete) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      console.log("Deleted orders:", res.data);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }else{
    console.log("deletion cancelled")
  }
}
  useEffect(() => {
    fetchData();
  }, []);
  console.log(list)   
  const SearchOrder=(searchOrder)=>{
   // alert(`${searchOrder}`)
    const filtered =list.filter((el) =>
     el.phone === searchOrder
    );
      setList(filtered);   
  }
  return (
    <>
     <div className='wrapper '
    style={{height:"100vh"}}
     >
      <div className="main">
                <OrderPaginate1 
        items={list}
        deleteOrders={deleteOrders}
        SearchOrder={SearchOrder}
        />      
      </div>            
    </div>
    <Footer style={{marginBottom:"0px"}}/>   
    </>  
  )
}
