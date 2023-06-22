import { createContext, useContext, useState } from "react";
import axios from "axios";


const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage?.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoginFunction = async (userName, userPassword) => {
    try {
      const userData = await axios.post("/api/auth/login", {
        username: userName,
        password: userPassword,
      });
      const { foundUser, encodedToken } = userData.data;
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("user", JSON.stringify({ user: foundUser }));
      setUserData(foundUser);
    } catch (e) {
      console.error("Something went wrong!");
    }
  };

  const newUserSignUpFunction = async (
    firstName,
    lastName,
    username,
    password
  ) => {
    try {
      const newUser = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        username,
        password,
      });
      const { encodedToken, createdUser } = newUser;
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("user", JSON.stringify({ user: createdUser }));
      setUserData(createdUser);
    } catch (e) {}
  };

  
  return (
    <AuthContext.Provider
      value={{
        userLoginFunction,
        userData,
        isLoggedIn,
        setIsLoggedIn,
        newUserSignUpFunction,
        setUserData,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
