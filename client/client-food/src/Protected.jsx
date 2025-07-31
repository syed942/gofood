
import { Children,useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Home1 from './Home1';

const Protected = ({ children }) => {
  const navigate=useNavigate()
  //const isAuthenticated = sessionStorage.getItem('login');
  //const isAuthenticated = localStorage.getItem('login')
  const storedUser =JSON.parse( localStorage.getItem("user"));
  const  isAuthenticated=storedUser?.login

  return isAuthenticated ? children : <Navigate to="/login1" />;
};  //100% correct code above
// useEffect(()=>{  
//   let user=sessionStorage.getItem('login')
      
//         if (!user) {
        
//         navigate("/login")
//         }
// })
      
//       return (
//         <div>
//           <Home1 />
//             {/* <Children /> */}
//         </div>
//       )
       
//   }
 

export default Protected;