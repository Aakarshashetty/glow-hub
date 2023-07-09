import React, { useEffect, useState } from "react";
import { BiLink } from "react-icons/bi";
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

import { RxCross2 } from "react-icons/rx";
import "./userProfile.css";

const UserProfile = () => {
  const { userName } = useParams();
  const { postData, unFollowUser, followUser, editUser } = usePosts();
  const { userData, showEditProfile, setShowEditProfile } = useAuth();
  const navigate = useNavigate();

  const userPosts = postData?.posts.filter(
    ({ username }) => username === userName
  );
  const getUserDetails = (username) => {
    const user = postData?.users.find((user) => user.username === username);
    return user;
  };
  const user = getUserDetails(userName);
  const { _id, firstName, lastName, bio, avatarURL, username, portfolioURL } =
    user;

  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [userAvatar, setUserAvatar] = useState(avatarURL);

  useEffect(() => {
    function checkLoggedUser() {
      return username === userData.username
        ? setShowEditProfile(true)
        : setShowEditProfile(false);
    }
    checkLoggedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    setEditedUser({ ...editedUser, avatarURL: userAvatar });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAvatar]);
  const saveHandler = async () => {
    editUser(editedUser);
    setShowEditUser(!showEditUser);
    
  };

  return (
    <div className="profile">
      <Header />
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

              <span>
                <BiLink />
                <a className="portfolio-url" href={portfolioURL}>
                  {portfolioURL}
                </a>
              </span>
              <p>{bio}</p>
              <div className="userFollwingAnsFollowers">
                <p> {getUserDetails(username)?.followers?.length} Followers </p>
                <p onClick={() => setShowFollowing(true)}>
                  {getUserDetails(username)?.following?.length} Following
                </p>
              </div>
              {showFollowing &&
                getUserDetails(username)?.following?.length > 0 && (
                  <div className="editModal">
                    <div className="followedUser editContent">
                      <div className="heading">
                        <h2>Followers</h2>
                        <button
                          onClick={() => setShowFollowing(false)}
                          className="cancel"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {getUserDetails(username)?.following?.map(
                        ({ _id, firstName, lastName, username }) => (
                          <li key={_id} style={{ listStyle: "none" }}>
                            <div>
                              <img
                                src={getUserDetails(username).avatarURL}
                                alt={username}
                                width={35}
                                height={35}
                              />
                              <span>
                                <h3>
                                  {firstName} {lastName}
                                </h3>
                                <p>@{username}</p>
                              </span>
                            </div>
                            <button
                              onClick={() => unFollowUser(_id)}
                              className="un-follow"
                            >
                              Un Follow
                            </button>
                          </li>
                        )
                      )}
                    </div>
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
                    : followUser(_id)
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
          <div className="editModal userEditModal">
            <div className="editContent">
              <h2>Edit Profile</h2>
              <h3>Select Your Avatar</h3>
              <SelectAvatar
                userAvatar={userAvatar}
                setUserAvatar={setUserAvatar}
              />
              <label className="profileImage">
                Profile:
                <img src={userAvatar} alt="userAvatar" width={90} height={90} />
              </label>
              <label>
                <div>FirstName:</div>
                <input
                  type="text"
                  defaultValue={editedUser.firstName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstName: e.target.value })
                  }
                />
              </label>
              <label>
                <div>LastName:</div>
                <input
                  type="text"
                  defaultValue={editedUser.lastName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, lastName: e.target.value })
                  }
                />
              </label>
              <label>
                <div>Portfolio URL:</div>
                <input
                  type="text"
                  defaultValue={editedUser.portfolioURL}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      portfolioURL: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                <div>Bio:</div>
                <input
                  type="text"
                  defaultValue={editedUser.bio}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      bio: e.target.value,
                    })
                  }
                />
              </label>
              <div className="buttons">
                <button onClick={saveHandler} className="saveButton">
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowEditUser(!showEditUser);
                    setUserAvatar(avatarURL);
                  }}
                  className="cancelButton"
                >
                   <RxCross2 />
                </button>
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
