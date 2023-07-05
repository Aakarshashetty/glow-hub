import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import SelectAvatar from "./SelectAvatar";
import "./userProfile.css";

const UserProfile = () => {
  const { userName } = useParams();
  const { postData, unFollowUser, followUser,editUser } = usePosts();
  const { userData, showEditProfile, setShowEditProfile } = useAuth();
  
  const user = postData?.users.find(({ username }) => username === userName);
  const userPosts = postData?.posts.filter(
    ({ username }) => username === userName
  );
  const navigate = useNavigate();
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const {
    _id,
    firstName,
    lastName,
    bio,
    avatarURL,
    username,
    following,
    followers,
  } = user;
  const [userAvatar,setUserAvatar] = useState(avatarURL)
  useEffect(() => {
    function checkLoggedUser() {
      return (
        username === userData.username && setShowEditProfile(!showEditProfile)
      );
    }
    checkLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);
  return (
    <div className="profile">
      <Header/>
      <SideBar />
      <div className="userprofile">
        <div className="userprofile-user">
          <button onClick={() => navigate("/")}>
            <BsArrowLeft />
          </button>
          <div>
            <h2>
              {firstName} {lastName}
            </h2>
            <p>{userPosts.length} posts</p>
          </div>
        </div>
        <div className="userDetails">
          <div className="user">
            <div>
              <img src={avatarURL} alt={username} height={100} width={100} />
            </div>
            <div className="userBio">
              <h2>
                {firstName} {lastName}
              </h2>
              <small>@{username}</small>
              <p>{bio}</p>
              <div className="userFollwingAnsFollowers">
                <p> {followers?.length} Followers </p>
                <p onClick={() => setShowFollowing(true)}>
                  {following?.length} Following
                </p>
              </div>
              {showFollowing && (
                <div>
                  {following?.map(({ _id, firstName, lastName, username }) => (
                    <li key={_id} style={{ listStyle: "none" }}>
                      <h3>
                        {firstName} {lastName}
                      </h3>
                      <p>@{username}</p>
                      <button onClick={() => unFollowUser(_id)}>
                        UnFollow
                      </button>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>

          {showEditProfile ? (
            <div className="profileButtons">
              <button
                onClick={() => {
                  setEditedUser(user);
                  setShowEditUser(true);
                }}
              >
                <FaUserEdit />
              </button>
              <button>
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="profileButtons">
              <button
                onClick={() => {
                  postData?.userDetails?.following?.find(
                    (user) => user.username === username
                  )
                    ? unFollowUser(_id)
                    : followUser(_id);
                }}
              >
                {postData?.userDetails?.following?.find(
                  (user) => user.username === username
                ) ? (
                  <BsPersonFillDash />
                ) : (
                  <BsPersonFillAdd />
                )}
              </button>
              <button>
                <FiMessageSquare />
              </button>
            </div>
          )}
        </div>
        <div>
          {userPosts?.map((posts) => {
            return (
              username === posts.username && (
                <PostList posts={posts} key={posts._id} />
              )
            );
          })}
        </div>
        {showEditUser && (
          <div className="editModal">
            
            <div className="editContent">
            <h2>Edit Profile</h2>
              <h3>Select Your Avatar</h3>
             <SelectAvatar userAvatar={userAvatar} setUserAvatar={setUserAvatar}/>
             <label className="profileImage">
              Profile:
             <img src={userAvatar} alt="userAvatar" width={90} height={90}/>
             </label>
            <label>
              <div>
                Name:
                </div>
              <input
                type="text"
                defaultValue={editedUser.firstName + " " + editedUser.lastName}
              />
            </label>
            <label>
              <div>
                Portfolio URL:
                </div>
              <input type="text" />
            </label>
            <label>
              <div>
                Bio:
                </div>
              <input type="text" defaultValue={editedUser.bio} 
              onChange={(e)=>setEditedUser({...editedUser,bio:e.target.value,avatarURL:userAvatar})}
              />
            </label>
            <div className=".editButtons">
            <button onClick={()=>{editUser(editedUser);setShowEditUser(!showEditUser)}} className="saveButton">Save</button>
            <button onClick={()=>{setShowEditUser(!showEditUser);setUserAvatar(avatarURL)}} className="cancelButton">Cancel</button>
            </div>
            </div>
          </div>
        )}
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default UserProfile;
