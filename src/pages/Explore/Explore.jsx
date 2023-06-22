import React from "react";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";

const Explore = () => {
  const { postData } = usePosts();
  return (
    <div>
      {postData?.posts.map((posts) => (
        <PostList posts={posts} key={posts._id} />
      ))}
    </div>
  );
};

export default Explore;
