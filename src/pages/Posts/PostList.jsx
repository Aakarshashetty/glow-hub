import React, { useState } from "react";
import { useNavigate } from "react-router";
import { usePosts } from "../../contexts/post-context";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAuth } from "../../contexts/auth-context";
import "./posts.css";

const PostList = ({ posts }) => {
  // const [showCommentBox,setShowCommentBox] = useState(false)
  const [showEditBox, setShowEditBox] = useState(false);
  const [postToBeEdited, setPostToBeEdited] = useState({});
  const navigate = useNavigate();

  const {
    likePostFunction,
    dislikePostFunction,
    addPostToBookMarks,
    removeFromBookMarks,
    editPost,
    deletePost,
    postData,
  } = usePosts();
  const {
    userData: { bookmarks },
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

  const { firstName, lastName } = postData.users.find(
    (user) => user.username === username
  );
  return (
    <div key={_id}>
      <li key={_id} style={{ listStyle: "none" }}>
        <div className="postCard">
          <div className="userAvatar">
            <img src="" alt="pc" />
          </div>
          <div className="editAndDelete">
            <button
              onClick={() => {
                setPostToBeEdited(posts);
                setShowEditBox(true);
              }}
            >
              Edit
            </button>
            <button onClick={() => deletePost(_id)}>Delete</button>
          </div>
          <div className="postDetails">
            <div className="userNameAndTimestamp">
              <h3>
                {firstName} {lastName}
              </h3>
              <p className="createdAt"> . {createdAt}</p>
            </div>

            <p className="username">@ {username}</p>

            <p onClick={() => navigate(`/post/${_id}`)}>{content}</p>
            <img src={image} alt={_id}  />
            <div className="buttons">
              <button
                onClick={() => {
                  likedBy.find((post) => post.username === username)
                    ? dislikePostFunction(_id)
                    : likePostFunction(_id);
                }}
                
              >
                {likedBy.find((post) => post.username === username) ? (
                  <FcLike className="likebutton"/>
                ) : (
                  <FcLikePlaceholder className="likebutton"/>
                )}
                {" "}{likeCount}
              </button>
             
              <button>
                <FaRegComment />
              </button>
              {comments.length > 0 && comments.length}
              <button
                onClick={
                  bookmarks.find((postId) => postId === _id)
                    ? () => removeFromBookMarks(_id)
                    : () => addPostToBookMarks(_id)
                }
              >
                {bookmarks.find((postId) => postId === _id) ? (
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
        <div>
          <textarea
            type="text"
            defaultValue={postToBeEdited.content}
            onChange={(e) =>
              setPostToBeEdited({ ...postToBeEdited, content: e.target.value })
            }
          />
          <img
            src={postToBeEdited.image}
            alt={postToBeEdited._id}
            height={200}
            width={200}
          />
          <button
            onClick={() => {
              editPost(postToBeEdited);
              setShowEditBox(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setShowEditBox(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PostList;
