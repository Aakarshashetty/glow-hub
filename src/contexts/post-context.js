import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { postReducer } from "../reducers/postReducer";
import axios from "axios";
import { useAuth } from "./auth-context";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { setUserData, userData } = useAuth();
  const encodedToken = localStorage.getItem("encodedToken");
  const [postData, postDispatcher] = useReducer(postReducer, {
    users: [],
    userDetails: {},
    posts: [],
    bookmarks: [],
    filterBy:""
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const postData = await axios.get("/api/posts");
        (postData.status === 200 || postData.status === 201) &&
          postDispatcher({ type: "GET_POSTS", payload: postData.data.posts });
        const users = await axios.get("/api/users");
        (users.status === 200 || users.status === 201) &&
          postDispatcher({ type: "GET_USERS", payload: users.data.users });
      } catch (e) {
        console.error("couldn't able to get posts data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
    } catch (e) {
      console.error(e);
    }
    // postDispatcher({ type: "ADD_TO_BOOKMARKS", payload: post });
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
    } catch (e) {
      console.error(e);
    }
  };

  const createNewPost = async (input,url) => {
    console.log(url)
    try {
      const response = await axios.post(
        "/api/posts/",
        { postData: { content: input,image:url } },
        { headers: { authorization: encodedToken } }
      );
      (response.status === 200 || response.status === 201) &&
        postDispatcher({ type: "GET_POSTS", payload: response.data.posts });
    } catch (e) {
      console.error("error",e);
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
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <PostContext.Provider
      value={{
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePosts = () => useContext(PostContext);
