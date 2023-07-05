import "./App.css";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import LikedPosts from "./pages/LikedPosts/LikedPosts";
import Home from "./pages/Home/Home";
import Login from "./pages/AuthPages/Login/Login";
import SignUp from "./pages/AuthPages/Signup/SignUp";
import RequiresAuth from "./pages/AuthPages/RequiresAuth";
import SinglePost from "./pages/Posts/SinglePost";
import UserProfile from "./pages/userprofile/UserProfile";
import Logout from "./pages/AuthPages/Logout/Logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/user/profile/:userName" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
