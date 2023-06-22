import React from "react";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import { useAuth } from "../../contexts/auth-context";


const Bookmarks = () => {
  const { postData } = usePosts();
  const { userData } = useAuth();
  console.log(userData);
  console.log(postData.bookmarks);
  const getBookmarkedPost = (postId) =>
    postData.posts.filter(({ _id }) => _id === postId);
  return (
    <div>
      {userData?.bookmarks?.map((postId) => {
        const bookmarkedPosts = getBookmarkedPost(postId);
        return bookmarkedPosts.map((posts) => (
          <PostList posts={posts} key={posts._id} />
        ));
      })}
    </div>
  );
};

export default Bookmarks;
