import React from "react";
import { useNavigate, useParams } from "react-router";
import { usePosts } from "../../contexts/post-context";

const SinglePost = () => {
  const { postId } = useParams();
  const { postData } = usePosts();
  const navigate = useNavigate();
  const singlePost = postData?.posts.find(({ _id }) => _id === postId);
  const {
    _id,
    content,
    image,
    likes: { likeCount },
    comments,
    username,
    createdAt,
  } = singlePost;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>{username}</h3>
      <p>{createdAt}</p>
      <p>{content}</p>
      <img src={image} alt={_id} width={200} height={200} />
      <div>
        <button>Like</button>
        {likeCount}
        <button>Comment</button>
        {comments.length > 0 && comments.length}
        <button>BookMark</button>
      </div>
    </div>
  );
};

export default SinglePost;
