import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";
import "./login.css";
import Loader from "../../../Components/Loader";

const Login = () => {
  const { userLoginFunction, setIsLoggedIn, isLoggedIn,isLoading } = useAuth();
  const navigate = useNavigate();
  const [userInputData, setUserInputData] = useState({
    userName: "",
    password: "",
  });
  const guestCreds = {
    userName: "CleanBeautyRevolution",
    password: "lily123",
  };
  const loginHandler = () => {
    if (userInputData.userName !== "" && userInputData.userName !== "") {
      setIsLoggedIn(!isLoggedIn);
      navigate("/");
      userLoginFunction(userInputData.userName, userInputData.password);
    } else {
      alert("Enter valid inputs");
    }
  };
  const loginAsAGuestHandler = () => {
    navigate("/");
    setIsLoggedIn(!isLoggedIn);
    userLoginFunction(guestCreds.userName, guestCreds.password);
  };
  return (
    <div className="login">
      {isLoading && <Loader/>}
      <div>
        <img
          src="https://res.cloudinary.com/dbiove79b/image/upload/v1688568782/cosmetics-set-with-lavender-for-skin-care-cream-soap-lotion-in-jars-and-tubes-illustration-isolated-clipart-for-spa-treatments-for-face-and-body-vector_cleanup_k8mwrg.png"
          alt="heroImage"
          height={500}
          width={500}
        />
      </div>
      <div className="login-inputs">
        <h1>Glow Hub</h1>

        <div className="required">Username</div>
        <input
          type="text"
          onChange={(e) =>
            setUserInputData({ ...userInputData, userName: e.target.value })
          }
          placeholder="Enter username"
        />

        <div className="required">Password</div>
        <input
          type="password"
          onChange={(e) =>
            setUserInputData({ ...userInputData, password: e.target.value })
          }
          placeholder="Enter password"
        />

        <button onClick={loginHandler} className="login-button">
          Login
        </button>
        <button onClick={loginAsAGuestHandler} className="login-guest">
          Login As a Guest
        </button>
        <p>
          Don't have an Account? <NavLink to="/signup">Signup</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
