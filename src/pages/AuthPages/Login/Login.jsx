import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";

const Login = () => {
  const { userLoginFunction, setIsLoggedIn, isLoggedIn } = useAuth();
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
    setIsLoggedIn(!isLoggedIn);
    navigate("/");
    userLoginFunction(guestCreds.userName, guestCreds.password);
  };
  return (
    <div>
      <label>
        Username
        <input
          type="text"
          onChange={(e) =>
            setUserInputData({ ...userInputData, userName: e.target.value })
          }
          placeholder="Enter username"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          onChange={(e) =>
            setUserInputData({ ...userInputData, password: e.target.value })
          }
          placeholder="Enter password"
        />
      </label>
      <button onClick={loginHandler}>Login</button>
      <button onClick={loginAsAGuestHandler}>Login As a Guest</button>
      <p>
        Don't have an Account? <NavLink to="/signup">Signup</NavLink>
      </p>
    </div>
  );
};

export default Login;
