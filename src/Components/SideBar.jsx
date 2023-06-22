import React from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';

const SideBar = ({sideBar,setSideBar}) => {
    const navigate = useNavigate();
    const { userData } = useAuth();
  return (
    <div className='sidebar'>
        <nav onClick={(e) => setSideBar(e.target.innerText)}>
          <div>Home</div>
          <div>Explore</div>
          <div>Bookmarks</div>
          <div>Liked Posts</div>
          <div onClick={() => navigate("/profile")}>
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
            <p>@{userData.username}</p>
          </div>
        </nav>
    </div>
  )
}

export default SideBar