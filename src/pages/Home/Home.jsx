import React, { useState } from "react";
import "./home.css";
import { usePosts } from "../../contexts/post-context";
import { useAuth } from "../../contexts/auth-context";
import PostList from "../Posts/PostList";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { LuImagePlus } from "react-icons/lu";
import { uploadImage } from "./uploadImage";

const Home = () => {
  const { postData, createNewPost, postDispatcher } = usePosts();
  const { userData } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const followingUsers = postData?.userDetails?.following?.map(
    (user) => user.username
  );
  const filterByFollowingUsers = postData.posts.filter(
    (posts) =>
      posts.username === userData.username ||
      followingUsers?.includes(posts.username)
  );

  const submitPost = async () => {
    if (image) {
      const resp = await uploadImage(image);
      createNewPost(content, resp.url);
    } else createNewPost(content, "");

    setContent("");
    setImage(null);
  };

  return (
    <div className="content">
      <SideBar />
      <main>
        <div>
          <div
            style={{ border: "1px solid", margin: "10px" }}
            className="newpost"
          >
            <textarea
              type="text"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {image && (
              <div>
                <img
                  src={URL.createObjectURL(image)}
                  alt="inputImage"
                  height={50}
                  width={50}
                />

                <button onClick={() => setImage(null)}>close</button>
              </div>
            )}
            <label>
              <input
                type="file"
                onChange={(e) => {
                  if (Math.round(e.target.files[0].size / 1024000) > 1) {
                    console.error("File size should not be more than 1Mb");
                  } else {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <LuImagePlus />
            </label>
            <button
              onClick={submitPost}
              disabled={content === "" && image === null}
              className="postbutton"
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
      </main>
      <SuggestedUsers />
    </div>
  );
};

export default Home;
