import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//import { GlobalProvider, useGlobalContext } from "./GlobalStates/GlobalContext";
//import jwt_decode from "jwt-decode";
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { gapi } from 'gapi-script';

export const Login = () => {
  // const {setUser,userAdmin} =   useGlobalContext()
  // const userData= {email:"admin@gmail.com",password:"admin"}
  // useEffect(()=>{
  //   setUser(userData)
  // },[])
  
   
  //  console.log(userAdmin)
  // const { adminUser, adminPassword } = useContext(GlobalContext);
  // console.log("admin user and adminpassword", adminUser, adminPassword)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log("showPassword", showPassword);
  const [error, setErrorMessages] = useState("");
  const [data, setData] = useState([]);
  const [showModel, setShowModal] = useState(false);
  console.log("data is ", data);

  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // var user = localStorage.getItem('login')
   // var user1 = sessionStorage.getItem("isLoggedIn");
   // if (user1) {
      navigate("/");
   // }
  },[]);
  const url = "http://localhost:5000";

  const FetchData = async () => {
    await axios.get(`${url}/`).then((response) => {
      // axios.get(`http://localhost/ReactApps/food-web/SingleUser.php/?email=${loginForm.email}`).then((response) => {
      console.log(response.data.contact);
      setData(response.data.contact);
    });
  };
  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    FetchData();
  }, [email, password]);

  const [profile, setProfile] = useState([]);
  // const clientId =  '1001712440940-7u8j7te4uluitfbkvgakrpc6g88d8o5j.apps.googleusercontent.com'
  // const clientId = '1037666133127-cste80get37mqk0in8b7pjfl36s3bh9v.apps.googleusercontent.com'

  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ''
  //     });
  //   };
  //   gapi.load('client:auth2', initClient);
  // });
  // const onSuccess = (res) => {
  //   console.log(res.profileObj);
  //   setProfile(res.profileObj);
  //   localStorage.setItem("login", true);
  //   navigate("/?limit=5&&offset=0");
  // };
  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    //  setLoginForm({...loginForm,email:"",password:""})

    setProfile(null);
  };
  useEffect(() => {
    // localStorage.setItem("name", null)
    sessionStorage.setItem("name", null);
  }, []);
  // useEffect(()=>{
  //   window.location.reload(true)
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
   
//console.log("global state from login",user)
    const user = data.find((item) => item.email == email);
    console.log(user);
    //setLoginForm({...loginForm,email:"",password:""})
    if (user?.email === email && user?.password === password) {
      // localStorage.setItem('login', true)
      localStorage.setItem("isLoggedIn", true);
     // sessionStorage.setItem("role","user")
      navigate("/?limit=5&&offset=0");
    //  window.location.reload()
    }
    else if(userAdmin.email === email && 
    userAdmin.password === password){
//       localStorage.setItem("isLoggedIn", "true");
// localStorage.setItem("role", "admin"); 
      localStorage.setItem("loggin", true)
      localStorage.setItem("admin", true)
      // localStorage.setItem('login', true)
      // localStorage.setItem('admin', true)
      navigate("/?limit=5&&offset=0")
      // window.location.reload()
    }
    else {
      // navigate("/login")
      //alert("emai wrong");
       toast.error("email or password incorrect")
       setLoginFailed(true)
    }
  };

  // useEffect(() => {
  //   setTimeout(() => { setLoginForm({ ...loginForm, email: "", password: "" }) }, 12000)

  // }, [])
  //const Login = () => {
    // const handleSuccess = async (credentialResponse) => {
    //   const token = credentialResponse.credential;
  
    //   // Send token to backend
    //   try {
    //     const res = await axios.post('http://localhost:5000/api/google-login', { token });
    //     console.log('User verified:', res.data);
    //    // if(res.data){
    //     sessionStorage.setItem("isLoggedIn", "true");
    //        sessionStorage.setItem("role","user")
    //   navigate("/?limit=5&&offset=0");
         
    //   //  }
    //   } catch (error) {
    //     console.error('Verification failed:', error);
    //   }
    // };

  return (
    <div className="wrapper">
      <div className="main">
        <div className="container-fluid p-0 ">
          <div className="modal d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
              <div
                className="modal-content bg-dark text-white"
                style={{ border: "2px solid yellow" }}
              >
                <div className="modal-header d-flex justify-content-center align-items-center">
                  <h1 className="modal-title ">
                    Login
                    {/* {id?'Edit Product':'Add Product'}                    */}
                  </h1>
                  {/* <button type="button" class="btn-close"  aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                      <label htmlFor="email" className="form-label ">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        // required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="pwd" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        // required
                        className="form-control"
                        name="password"
                        id="pwd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div
                      className="modal-footer 
              my-3
              d-flex justify-content-center align-items-center"
                    >
                      {" "}
                      <div>
                        <button type="submit" className="btn btn-primary mx-3">
                          SignIn
                        </button>
                       
                        {/* <button className='btn btn-light'
                        onClick={()=>setShowModal(!showModel)}
                        >
                          Cancel
                        </button> */}
                      </div>
                     
                    </div>
                  </form>
                  {/* <div className="w-100">
                      <a href="http://localhost:5000/auth/google">
  <button>Login with Google</button>
</a>
                      </div> */}
                      <div>
                      <GoogleOAuthProvider clientId="798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com">
                      {/* <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    /> */}
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
     const token = credentialResponse.credential;
     
     try {
      const res =  axios.post('/auth/google-login', { token });
     // if(res.data){
      localStorage.setItem("isLoggedIn", true);
         //  sessionStorage.setItem("role","user")
      navigate("/?limit=5&&offset=0");
               console.log('User verified:', res.data);
     // }
       
      
      
    } catch (error) {
      console.error('Verification failed:', error);
      // sessionStorage.setItem("login", false);
      // navigate("/login")
    }
  }
}
    />
</GoogleOAuthProvider>
                      </div>
        
                </div>
              </div>
            </div>
          </div>
        </div>

       
{/* 

  <GoogleOAuthProvider clientId="798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          // Send token to backend for verification
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider> */}
 


      </div>
      </div>
   
  )
}
