import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { getDate } from "../../backend/utils/getDate";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import "./posts.css";
import "reactjs-popup/dist/index.css";
import Loader from "../../Components/Loader";


const PostList = ({ posts }) => {
  // const [showCommentBox,setShowCommentBox] = useState(false)
  const [showEditBox, setShowEditBox] = useState(false);
  const [postToBeEdited, setPostToBeEdited] = useState({});
  const [showEditAndDelete, setShowEditAndDelete] = useState(false);
  const navigate = useNavigate();
  const {
    likePostFunction,
    dislikePostFunction,
    addPostToBookMarks,
    removeFromBookMarks,
    editPost,
    deletePost,
    postData,
    isLoading,
  } = usePosts();
  const {
    userData,
  } = useAuth();

  const {
    _id,
    content,
    image,
    likes: { likeCount, likedBy },
    comments,
    username,
    createdAt,
  } = posts;

  const { firstName, lastName, avatarURL } = postData?.users?.find(
    (user) => user.username === username
  );

  return (
    
    <div key={_id} className="post">
      {isLoading && <Loader/>  }
      <li key={_id} style={{ listStyle: "none" }}>
        <div className="postCard">
          <div className="userAvatar">
            <img src={avatarURL} alt="pc" width={30} height={30} />
          </div>
          <div>
            {username===userData.username && <HiOutlineDotsHorizontal
              onClick={() => setShowEditAndDelete(!showEditAndDelete)}
              className="menuButton"
            />}
            {(showEditAndDelete) && (
              <div className="editAndDelete">
               
                <button
                  onClick={() => {
                    setPostToBeEdited(posts);
                    setShowEditBox(true);
                  }}
                  className="editButton"
                >
                  <MdOutlineModeEditOutline /> Edit
                </button>
                <button
                  onClick={() => deletePost(_id)}
                  className="deleteButton"
                >
                  <MdOutlineDelete /> Delete
                </button>
              </div>
            )}
          </div>
          <div className="postDetails">
            <div className="userNameAndTimestamp">
              <h3
                onClick={() => {
                  navigate(`/user/profile/${username}`);
                  window.scroll(0, 0);
                }}
              >
                {firstName} {lastName}
              </h3>
              <p className="createdAt"> . {getDate(createdAt)}</p>
            </div>

            <p className="username">@ {username}</p>

            <p onClick={() => {navigate(`/post/${_id}`);window.scroll(0,0)}}>{content}</p>
            <img src={image} alt={_id} />
            <div className="buttons">
              <button
                onClick={() => {
                  likedBy.find((post) => post.username === username)
                    ? dislikePostFunction(_id)
                    : likePostFunction(_id);
                }}
              >
                {likedBy.find((post) => post.username === username) ? (
                  <FcLike className="likebutton" />
                ) : (
                  <FcLikePlaceholder className="likebutton" />
                )}{" "}
                {likeCount}
              </button>

              <button>
                <FaRegComment />
              </button>
              {comments?.length > 0 && comments?.length}
              <button
                onClick={
                  userData.bookmarks.find((postId) => postId === _id)
                    ? () => removeFromBookMarks(_id)
                    : () => addPostToBookMarks(_id)
                }
              >
                {userData.bookmarks.find((postId) => postId === _id) ? (
                  <BsBookmarkFill />
                ) : (
                  <BsBookmark />
                )}
              </button>
            </div>
          </div>
        </div>
      </li>
      {showEditBox && (
        <div className="editModal">
        <div className="editContent">
          <label className="text">
          <img src={avatarURL} alt="pc" width={40} height={40} className="avatar"/>
          <textarea
            type="text"
            defaultValue={postToBeEdited.content}
            onChange={(e) =>
              setPostToBeEdited({ ...postToBeEdited, content: e.target.value })
            }
          />
          </label>
          <img
            src={postToBeEdited.image}
            alt={postToBeEdited._id}
            height={200}
            width={200}
            className="image"
          />
          <div className="editButtons">
          <button
            onClick={() => {
              editPost(postToBeEdited);
              setShowEditBox(false);
              setShowEditAndDelete(false);
            }}
          >
            Save
          </button>
          <button onClick={() => {setShowEditBox(false);setShowEditAndDelete(false)}} className="cancel">Cancel</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
