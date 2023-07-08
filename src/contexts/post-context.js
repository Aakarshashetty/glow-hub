import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import { postReducer } from "../reducers/postReducer";
import { useAuth } from "./auth-context";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { setUserData, userData, isLoading, setIsLoading } = useAuth();
  const encodedToken = localStorage.getItem("encodedToken");
  const [postData, postDispatcher] = useReducer(postReducer, {
    users: [],
    userDetails: {},
    posts: [],
    bookmarks: [],
    filterBy: "",
  });

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const postData = await axios.get("/api/posts");
      if (postData.status === 200 || postData.status === 201) {
        postDispatcher({ type: "GET_POSTS", payload: postData.data.posts });
        setIsLoading(false);
      }
    } catch (e) {
      console.error("couldn't able to get posts data");
    } finally {
    }
  };
  const getUsers = async () => {
    try {
      const users = await axios.get("/api/users");
      if (users.status === 200 || users.status === 201) {
        postDispatcher({ type: "GET_USERS", payload: users.data.users });
        setIsLoading(false);
      }
    } catch (e) {}
  };

  const likePostFunction = async (postId) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
    } catch (e) {
      console.error("Couldn't able to like the post", e);
    }
  };

  const dislikePostFunction = async (postId) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
    } catch (e) {
      console.error("Couldn't able to dislike the post");
    }
  };

  const addPostToBookMarks = async (postId) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${postId}/`,
        {},
        {
          headers: { authorization: encodedToken },
        }
      );
      (response.status === 200 || response.status === 201) &&
        setUserData({ ...userData, bookmarks: response.data.bookmarks });
      toast("Bookmark added! Keep your favorite posts within reach!", {
        icon: "📌",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const removeFromBookMarks = async (postId) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${postId}/`,
        {},
        { headers: { authorization: encodedToken } }
      );
      (response.status === 200 || response.status === 201) &&
        setUserData({ ...userData, bookmarks: response.data.bookmarks });
      toast("Post unbookmarked! Make room for fresh discoveries!", {
        icon: "📌",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createNewPost = async (input, url) => {
    console.log(url);
    try {
      const response = await axios.post(
        "/api/posts/",
        { postData: { content: input, image: url } },
        { headers: { authorization: encodedToken } }
      );
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
      toast("Post created! Share your thoughts with the world!", {
        icon: "📝",
        duration: 2500,
      });
    } catch (e) {
      console.error("error", e);
    }
  };

  const editPost = async (post) => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${post._id}`,
        {
          postData: post,
        },
        { headers: { authorization: encodedToken } }
      );
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
      toast("Post updated! Fine-tuning the masterpiece!", {
        icon: "🖊️",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: encodedToken },
      });
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
      toast("Farewell, post! Embrace the power of letting go!", {
        icon: "🗑️",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const followUser = async (followUserId) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${followUserId}/`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      (response.status === 200 || response.status === 201) &&
        localStorage.setItem(
          "user",
          JSON.stringify({ user: response.data.user })
        );
      postDispatcher({ type: "ADD_USER_DETAILS", payload: response.data.user });
      toast("New connection made! Enjoy the shared experiences!", {
        icon: "🙌",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const unFollowUser = async (userId) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${userId}/`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      (response.status === 200 || response.status === 201) &&
        localStorage.setItem(
          "user",
          JSON.stringify({ user: response.data.user })
        );
      postDispatcher({ type: "ADD_USER_DETAILS", payload: response.data.user });
      toast("Unfollowed! Freeing up your feed! ", {
        icon: "❌",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const editUser = async (userData) => {

    try {
      const response = await axios.post(
        "/api/users/edit",
        { userData },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );

      (response.status === 200 || response.status === 201) &&
        localStorage.setItem(
          "user",
          JSON.stringify({ user: response.data.user })
        );
      postDispatcher({ type: "ADD_USER_DETAILS", payload: response.data.user });
      postDispatcher({ type: "EDIT_USER", payload: response.data.user });
      toast("Profile updated! Showcase your best self!", {
        icon: "📷",
        duration: 2500,
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <PostContext.Provider
      value={{
        getPosts,
        getUsers,
        postData,
        postDispatcher,
        isLoading,
        likePostFunction,
        dislikePostFunction,
        addPostToBookMarks,
        removeFromBookMarks,
        createNewPost,
        editPost,
        deletePost,
        followUser,
        unFollowUser,
        editUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePosts = () => useContext(PostContext);
