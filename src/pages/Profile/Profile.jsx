import React, { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userData } = useAuth();
  const { firstName, lastName, username, bio } = userData;
  const {
    postData: { posts, userDetails },
    unFollowUser,
  } = usePosts();
  const [showFollowing, setShowFollowing] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <div>
        <h2>
          {firstName} {lastName}
        </h2>
        <small>@{username}</small>
        <p>{bio}</p>
        <p>followers {userDetails?.followers.length}</p>
        <p onClick={() => setShowFollowing(true)}>
          following {userDetails?.following.length}
        </p>
        {showFollowing && (
          <div>
            {userDetails?.following.map(
              ({ _id, firstName, lastName, username }) => (
                <li key={_id} style={{ listStyle: "none" }}>
                  <h3>
                    {firstName} {lastName}
                  </h3>
                  <p>@{username}</p>
                  <button onClick={() => unFollowUser(_id)}>UnFollow</button>
                </li>
              )
            )}
          </div>
        )}
        <div>
          <button>edit profile</button>
          <button>Logout</button>
        </div>
      </div>
      <div>
        {posts?.map((posts) => {
          return (
            username === posts.username && (
              <PostList posts={posts} key={posts._id} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
