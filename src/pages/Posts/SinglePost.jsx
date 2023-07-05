import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { getDate } from "../../backend/utils/getDate";
import { usePosts } from "../../contexts/post-context";
import PostList from "./PostList";
import "./posts.css";
import "./singlePost.css";

const SinglePost = () => {
  const { postId } = useParams();
  const { postData } = usePosts();
  const navigate = useNavigate();
  const singlePost = postData?.posts.find(({ _id }) => _id === postId);
  const { comments,username } = singlePost;
  const { avatarURL } = postData.users.find(
    (user) => user.username === username
  );
  return (
    <div className="single-post">
      <Header/>
      <SideBar />

      <div className="post-details">
        <div className="nav-button">
          <button onClick={() => navigate(-1)}>
            <BsArrowLeft />
          </button>
          Post
        </div>
        <PostList posts={singlePost} />
      </div>
      {comments?.length > 0 && (
        <div className="comments-details">
          <div
            style={{ height: "1px", backgroundColor: "rgb(206, 206, 206)" }}
          ></div>
          <p>{comments?.length > 0 && comments?.length} comments</p>
          <div
            style={{ height: "1px", backgroundColor: "rgb(206, 206, 206)" }}
          ></div>
          <div className="reply">
            <img
              src={avatarURL}
              alt={username}
              width={40}
              height={40}
            />
            <input type="text" placeholder="post your reply" />
            <button className="post">Post</button>
          </div>
          <div
            style={{ height: "1px", backgroundColor: "rgb(206, 206, 206)" }}
          ></div>
          {comments?.map(
            ({ _id, username, text, avatarURL, firstName, lastName,createdAt }) => (
              <div key={_id}>
                <div className="avatarAndName">
                  <img src={avatarURL} alt={username} width={40} height={40} />
                  <div>
                    <div className="userNameAndTimestamp">
                    <h3>
                      {firstName} {lastName}
                    </h3>
                    {" "}
                    <p>. {getDate(createdAt)}</p>
                    </div>
                    <p>@{username}</p>
                  </div>
                </div>
                <div>
                  <p className="text">{text}</p>
                </div>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgb(206, 206, 206)",
                  }}
                ></div>
              </div>
            )
          )}
        </div>
      )}
      <SuggestedUsers />
    </div>
  );
};

export default SinglePost;
