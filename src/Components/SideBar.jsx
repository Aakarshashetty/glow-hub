import React from "react";
import { useAuth } from "../contexts/auth-context";
import { MdExplore, MdHome, MdBookmarks, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  const { userData } = useAuth();
  const getActiveStyle = ({isActive})=>({
    fontWeight: isActive && "bold"
  })
  const navigate = useNavigate();
  return (
    <div className="sidebar">
        <NavLink to="/" className="home" style={getActiveStyle}>
          <MdHome />
        </NavLink>
        <NavLink  to="/explore" className="explore" style={getActiveStyle}>
          <MdExplore />
        </NavLink>
        <NavLink to="/bookmarks"className="bookmarks" style={getActiveStyle}>
          <MdBookmarks />
        </NavLink>
        <NavLink to="/login" className="logout" style={getActiveStyle} onClick={()=>localStorage.setItem("user", "")}>
          <MdLogout />
        </NavLink>
        <div   className="profile" onClick={()=>navigate(`/user/profile/${userData.username}`)}>
            <img src={userData.avatarURL} alt="pc" width={30} height={30} />
            <span>
              <b>
                {userData.firstName} {userData.lastName}
              </b>{" "}
              <p>@{userData.username}</p>
            </span>
          
        </div>
     
    </div>
  );
};

export default SideBar;
