import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';


const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage?.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
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
      toast("Welcome back! Let the scrolling begin!",{icon:'🚀'});
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
      toast('Welcome to the community! Enjoy your stay! ', {
        icon: '🌟',
      });
    } catch (e) {}
  };

  
  return (
    <AuthContext.Provider
      value={{
        userLoginFunction,
        userData,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        newUserSignUpFunction,
        setUserData,
        showEditProfile,
        setShowEditProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
