import React from "react";
import { useAuth } from "../contexts/auth-context";
import { MdExplore, MdHome, MdBookmarks, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { userData } = useAuth();
  const getActiveStyle = ({isActive})=>({
    fontWeight: isActive && "bold"
  })
  return (
    <div className="sidebar">
      <nav >
        <NavLink to="/" className="home" style={getActiveStyle}>
          <MdHome />
        </NavLink>
        <NavLink  to="/explore" className="explore" style={getActiveStyle}>
          <MdExplore />
        </NavLink>
        <NavLink to="/bookmarks"className="bookmarks" style={getActiveStyle}>
          <MdBookmarks />
        </NavLink>
        <NavLink to="/logout" className="logout" style={getActiveStyle}>
          <MdLogout />
        </NavLink>
        <NavLink to="/profile"  className="profile">
            <img src={userData.avatarURL} alt="pc" width={30} height={30} />
            <span>
              <b>
                {userData.firstName} {userData.lastName}
              </b>{" "}
              <p>@{userData.username}</p>
            </span>
          
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
