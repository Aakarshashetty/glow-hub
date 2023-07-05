import React from "react";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import "./Bookmarks.css";


const Bookmarks = () => {
  const { postData } = usePosts();
  const { userData } = useAuth();
  const getBookmarkedPost = (postId) =>
    postData.posts.filter(({ _id }) => _id === postId);
    
  return (
    <div className="content bookmarks">
      <Header/>
      <SideBar/>
      <main>
        {userData?.bookmarks?.length === 0 && <div className="no-bookmarks">No Bookmarks</div>}
      {userData?.bookmarks?.map((postId) => {
        const bookmarkedPosts = getBookmarkedPost(postId);
        return bookmarkedPosts.map((posts) => (
          <PostList posts={posts} key={posts._id} />
        ));
      })}
      </main>
      <SuggestedUsers/>
    </div>
  );
};

export default Bookmarks;
