import React from "react";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import Header from "../../Components/Header";

const Explore = () => {
  const { postData } = usePosts();
  return (
    <div className="content">
      <Header/>
      <SideBar/>
      <main>
      {postData?.posts.map((posts) => (
        <PostList posts={posts} key={posts._id} />
      ))}
      </main>
      <SuggestedUsers/>
    </div>
  );
};

export default Explore;
