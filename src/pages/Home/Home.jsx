import React, { useState } from "react";
import "./home.css";
import { usePosts } from "../../contexts/post-context";
import { useAuth } from "../../contexts/auth-context";
import PostList from "../Posts/PostList";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { useNavigate } from "react-router";

const Home = () => {
  const [sideBar, setSideBar] = useState("Home");
  const { postData, createNewPost, postDispatcher } = usePosts();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const followingUsers = postData?.userDetails?.following?.map(
    (user) => user.username
  );
  const filterByFollowingUsers = postData.posts.filter(
    (posts) =>
      posts.username === userData.username ||
      followingUsers?.includes(posts.username)
  );

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "glow-hub");
    data.append("cloud_name", "dbiove79b");
    fetch("https://api.cloudinary.com/v1_1/dbiove79b/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="content">
      <SideBar sideBar={sideBar} setSideBar={setSideBar} />
      <div>
        <header>{sideBar}</header>
        <main>
          {sideBar === "Home" && (
            <div>
              <div
                style={{ border: "1px solid", margin: "10px", padding: "1rem" }}
              >
                <textarea
                  type="text"
                  placeholder="What's happening?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {url !== "" && (
                  <img src={url} alt="inputImage" height={50} width={50} />
                )}
                {url !== "" && (
                  <button onClick={() => setUrl("")}>close</button>
                )}
                {
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  ></input>
                }
                {<button onClick={uploadImage}>upload</button>}
                <button
                  onClick={() => {
                    createNewPost(content, url);
                    setContent("");
                    setUrl("");
                  }}
                  disabled={content === "" && url === ""}
                >
                  Post
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    postDispatcher({ type: "FILTER_POSTS", poaload: "date" })
                  }
                >
                  Latest
                </button>
                <button
                  onClick={() =>
                    postDispatcher({ type: "FILTER_POSTS", poaload: "likes" })
                  }
                >
                  Trending
                </button>
              </div>
              {filterByFollowingUsers.map((posts) => (
                <PostList posts={posts} key={posts.id} />
              ))}
            </div>
          )}
          {sideBar === "Explore" && navigate("/explore")}
          {sideBar === "Bookmarks" && navigate("/bookmarks")}
          {sideBar === "Liked Posts" && navigate("/liked")}
        </main>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default Home;
