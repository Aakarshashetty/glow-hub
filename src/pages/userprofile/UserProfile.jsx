import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import SideBar from "../../Components/SideBar";
import { useAuth } from "../../contexts/auth-context";
import { BsArrowLeft,BsPersonFillAdd,BsPersonFillDash } from "react-icons/bs";
import {FiMessageSquare,FiLogOut} from "react-icons/fi";
import {FaUserEdit} from "react-icons/fa";
import "./userProfile.css";
import SuggestedUsers from "../../Components/SuggestedUsers";

const UserProfile = () => {
  const { userName } = useParams();
  const { postData, unFollowUser, followUser } = usePosts();
  const { userData,showEditProfile,setShowEditProfile } = useAuth();
  const user = postData?.users.find(({ username }) => username === userName);
  const userPosts = postData?.posts.filter(
    ({ username }) => username === userName
  );
  const navigate = useNavigate();
  const [showFollowing, setShowFollowing] = useState(false);

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
              <button><FaUserEdit/></button>
              <button><FiLogOut/></button>
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
                )
                  ? <BsPersonFillDash/>
                  : <BsPersonFillAdd/>}
              </button>
              <button><FiMessageSquare/></button>
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
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default UserProfile;
