import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { usePosts } from "../contexts/post-context";

const SuggestedUsers = () => {
  const { postData, followUser } = usePosts();
  const { userData,setShowEditProfile } = useAuth();
  const  navigate  = useNavigate();
  const getFilteredUsers = ()=>{
    let filteredUsers = postData.users;
    if(postData.searchBy !== ""){
      filteredUsers = postData.users.filter(user=>user.firstName.toLowerCase().includes(postData.searchBy)||user.lastName.toLowerCase().includes(postData.searchBy)||user.username.toLowerCase().includes(postData.searchBy))
    }
    else{
      filteredUsers = postData.users
    }
    return filteredUsers
  }
  return (
    <aside>
      <h3>Who to follow</h3>
      <div className="suggestedUsers">
        {getFilteredUsers()?.map(
          ({ _id, firstName, lastName, username, avatarURL }) =>
            username !== userData.username &&
            postData.userDetails?.following?.find(
              (post) => post.username === username
            ) === undefined && (
              <li
                key={_id}
                style={{ listStyle: "none" }}
                
              >
                <img src={avatarURL} alt="pc" width={40} height={40} />
                <h3 onClick={() =>{navigate(`/user/profile/${username}`); window.scroll(0,0); setShowEditProfile(false)}}>
                  {firstName} {lastName}
                </h3>
                <p>@{username}</p>
                <button onClick={() => {followUser(_id)}} className="follow">
                  Follow
                </button>
              </li>
            )
        )}
      </div>
    </aside>
  );
};

export default SuggestedUsers;
