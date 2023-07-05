import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";
import "./signup.css";

const SignUp = () => {
  const [newUserInputData, setNewUSerInputData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();
  const signUpHandler = () => {
    if (
      newUserInputData.firstName === "" ||
      newUserInputData.lastName === "" ||
      newUserInputData.userName === "" ||
      newUserInputData.email === "" ||
      newUserInputData.password === ""
    ) {
      alert("Enter valid details")
    } else {
      newUserSignUpFunction(
        newUserInputData.firstName,
        newUserInputData.lastName,
        newUserInputData.userName,
        newUserInputData.password
      );
      navigate("/");
    }
  };
  const { newUserSignUpFunction } = useAuth();
  return (
    <div className="signup-page">
      <h1>Glow Hub</h1>
    <div className="signup">
      
      <label className="name">
        <div className="required">
        First Name:
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) =>
              setNewUSerInputData({
                ...newUserInputData,
                firstName: e.target.value,
              })
            }
            className="first-name-input"
          />
        </div>
      </label>
      <label>
        <div className="required">

        Last Name:
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) =>
              setNewUSerInputData({
                ...newUserInputData,
                lastName: e.target.value,
              })
            }
            className="last-name-input"
          />
        </div>
      </label>
      <label>
        <div className="required">
        Email Address:
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) =>
              setNewUSerInputData({
                ...newUserInputData,
                email: e.target.value,
              })
            }
          />
        </div>
      </label>
      <label>
        <div className="required">

        Username:
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) =>
              setNewUSerInputData({
                ...newUserInputData,
                userName: e.target.value,
              })
            }
          />
        </div>
      </label>
      <label>
        <div className="required">

        Password:
        </div>
        <div className="input">
          <input
            type={passwordType ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) =>
              setNewUSerInputData({
                ...newUserInputData,
                password: e.target.value,
              })
            }
          />
          <button
            onClick={() => setPasswordType((prev) => !prev)}
            className="show"
          >
            {passwordType ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </label>
      <button onClick={signUpHandler} className="signup-button">
        Sign up
      </button>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </div>
    </div>
  );
};

export default SignUp;
