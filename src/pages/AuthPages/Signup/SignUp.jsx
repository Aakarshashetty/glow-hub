import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth-context";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [newUserInputData, setNewUSerInputData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const signUpHandler = () => {
    newUserSignUpFunction(
      newUserInputData.firstName,
      newUserInputData.lastName,
      newUserInputData.userName,
      newUserInputData.password
    );
    navigate("/");
  };
  const { newUserSignUpFunction } = useAuth();
  return (
    <div>
      <label>
        First Name
        <input
          type="text"
          placeholder="Enter First Name"
          onChange={(e) =>
            setNewUSerInputData({
              ...newUserInputData,
              firstName: e.target.value,
            })
          }
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) =>
            setNewUSerInputData({
              ...newUserInputData,
              lastName: e.target.value,
            })
          }
        />
      </label>
      <label>
        Email Address
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e) =>
            setNewUSerInputData({ ...newUserInputData, email: e.target.value })
          }
        />
      </label>
      <label>
        Username
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
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) =>
            setNewUSerInputData({
              ...newUserInputData,
              password: e.target.value,
            })
          }
        />
      </label>
      <button onClick={signUpHandler}>Sign up</button>
    </div>
  );
};

export default SignUp;
