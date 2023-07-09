import React, { useEffect, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import SideBar from "../../Components/SideBar";
import SuggestedUsers from "../../Components/SuggestedUsers";
import { uploadImage } from "../../backend/utils/uploadImage";
import { useAuth } from "../../contexts/auth-context";
import { usePosts } from "../../contexts/post-context";
import PostList from "../Posts/PostList";
import "./home.css";

import Header from "../../Components/Header";
import Loader from "../../Components/Loader";

const Home = () => {
  const {
    postData,
    createNewPost,
    postDispatcher,
    isLoading,
    getPosts,
    getUsers,
  } = usePosts();
  const { userData } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const user = postData?.users?.find(
    (user) => user?.username === userData.username
  );
  const followingUsers = postData?.userDetails?.following?.map(
    (user) => user.username
  );
  const filterByFollowingUsers = postData.posts.filter(
    (posts) =>
      posts.username === userData.username ||
      followingUsers?.includes(posts.username)
  );
  const getFilteredPosts = () => {
    let updatedPosts = filterByFollowingUsers;
    if (postData.filterBy === "latest") {
      updatedPosts = filterByFollowingUsers.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
    }
    if (postData.filterBy === "likes") {
      updatedPosts = filterByFollowingUsers.sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
    }
    return updatedPosts;
  };

  const submitPost = async () => {
    if (image) {
      const resp = await uploadImage(image);
      createNewPost(content, resp.url);
    } else createNewPost(content, "");

    setContent("");
    setImage(null);
  };

  useEffect(() => {
    getPosts();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <div className="content">
        <SideBar />
        <main>
          <div>
            <div style={{ margin: "10px" }} className="newpost">
              <img src={user?.avatarURL} alt="pc" width={35} height={35} />
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
                    className="new-post-img"
                  />

                  <button onClick={() => setImage(null)}>close</button>
                </div>
              )}
              <div className="file">
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
                  <LuImagePlus className="file-icon" />
                </label>
                <button
                  onClick={submitPost}
                  disabled={content === "" && image === null}
                  className="postbutton"
                >
                  Post
                </button>
              </div>
            </div>
            <div className="latestAndTrending">
              <button
                onClick={() =>
                  postDispatcher({ type: "FILTER_POSTS", payload: "latest" })
                }
              >
                Latest
              </button>
              <button
                onClick={() =>
                  postDispatcher({ type: "FILTER_POSTS", payload: "likes" })
                }
              >
                <BiTrendingUp className="trending" /> Trending
              </button>
            </div>
            <div style={{ height: "1px", backgroundColor: "#adb5bd" }}></div>
            {isLoading && <Loader />}
            {getFilteredPosts().map((posts) => (
              <PostList posts={posts} key={posts.id} />
            ))}
          </div>
        </main>
        {isLoading ? <Loader /> : <SuggestedUsers />}
      </div>
    </div>
  );
};

export default Home;
