import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  GlobalContext,
  GlobalProvider,
} from "./GlobalStates/GlobalContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
export const Login1 = ({}) => {
  const { userName, passwordAdmin } = useContext(GlobalContext);
  console.log("admin user and adminpassword", userName, passwordAdmin);
  console.log(" user name", userName);
  const [email, setEmail] = useState("");
  const [empty, setEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log("showPassword", showPassword);
  const [error, setErrorMessages] = useState("");
  const [data, setData] = useState([]);
  console.log("data is ", data);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser?.login) {
      navigate("/");
    }
  }, []);

  console.log(email, password);

  const url = "http://localhost:5000";
  const FetchData = async () => {
    await axios.get(`${url}/`).then((response) => {
      // axios.get(`http://localhost/ReactApps/food-web/SingleUser.php/?email=${loginForm.email}`).then((response) => {
      console.log(response.data.contact);
      setData(response.data.contact);
    });
  };
  // const ShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  useEffect(() => {
    FetchData();
  }, [email, password]);
  useEffect(() => {
    localStorage.setItem("name", null);
  }, []);
  console.log(localStorage.getItem("name"));
  const handleSubmit = (e) => {
    e.preventDefault();
    const user1 = data.find((item) => item.email === email);
    if (email === userName && password === passwordAdmin) {
      const adminUser = {
        admin: true,
        login: true,
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      setEmail("");
      setPassword("");
      navigate("/?limit=5&offset=0");

      window.location.reload(true);
    } else if (user1.email === email && user1.password === password) {
      const normalUser = {
        admin: false,
        login: true,
      };
      localStorage.setItem("user", JSON.stringify(normalUser));
      setEmail("");
      setPassword("");
      navigate("/?limit=5&offset=0");
      window.location.reload(true);
    } else {
      console.warn("Login failed");
      setLoginFailed(true);
      {
        loginFailed ? toast.error(" password incorrect") : "";
      }
    }
  };

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
                  <h1 className="modal-title ">Login</h1>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                      <label htmlFor="email" className="form-label ">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="enetr email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onMouseDown={() => setEmail("")}
                        onChange={(e) => {
                          {
                            setEmail(e.target.value);
                          }
                        }}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="pwd" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          placeholder="enter password"
                          onMouseDown={() => setPassword("")}
                          type={showPassword ? "text" : "password"}
                          className="form-control "
                          name="password"
                          id="pwd"
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <button
                          type="button"
                          className="text-white btn px-3 btn-sm
        btn-primary btn-outline-none  
        "
                          // style={{width:"100px"}}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>

                    <div
                      className="modal-footer 
            my-3
            d-flex justify-content-center align-items-center"
                    >
                      <div>
                        <button type="submit" className="btn btn-primary mx-3">
                          SignIn
                        </button>
                      </div>
                    </div>
                  </form>
                  <div>
                    <GoogleOAuthProvider clientId="798951544769-8ogqnad72r1hibi6n8153vruat1mrjmf.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log(credentialResponse);
                          const token = credentialResponse.credential;
                          try {
                            const res = axios.post("/auth/google-login", {
                              token,
                            });
                            localStorage.setItem(
                              "user",
                              JSON.stringify({
                                login: true,
                                admin: false,
                              })
                            );

                            navigate("/?limit=5&&offset=0");
                            window.location.reload(true)
                            console.log("User verified:", res.data);
                          } catch (error) {
                            console.error("Verification failed:", error);
                          }
                        }}
                      />
                    </GoogleOAuthProvider>
                  </div>
                  <div>
                    <button
                      className="btn btn-light w-100 mt-4"
                      onClick={() => navigate("/signup")}
                    >
                      Create new Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
