export const postReducer = (postData, { type, payload }) => {
  switch (type) {
    case "GET_POSTS":
      return {
        ...postData,
        posts: payload,
      };
    case "GET_USERS":
      return {
        ...postData,
        users: payload,
      };
    case "ADD_TO_BOOKMARKS":
      return {
        ...postData,
        bookmarks: payload,
      };
    case "REMOVE_FROM_BOOKMARKS":
      return {
        ...postData,
        bookmarks: postData.bookmarks.filter(
          ({ content }) => content !== payload.content
        ),
      };
    case "ADD_USER_DETAILS":
      return {
        ...postData,
        userDetails: payload,
        users: postData.users.map((user) =>
          user.username === postData.userDetails.username
            ? { ...payload }
            : user
        ),
      };
    case "FILTER_POSTS": {
      return {
        ...postData,
        filterBy: payload,
      };
    }
    case "EDIT_USER": {
      return {
        ...postData,
        users: postData.users.map((user) =>
          user.username === payload.username ? payload : user
        ),
      };
    }
    case "SEARCH_USER": {
      return {
        ...postData,
        searchBy: payload,
      };
    }
    default:
      return postData;
  }
};
