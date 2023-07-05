import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/AuthPages/Login/Login";
import Logout from "./pages/AuthPages/Logout/Logout";
import RequiresAuth from "./pages/AuthPages/RequiresAuth";
import SignUp from "./pages/AuthPages/Signup/SignUp";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import LikedPosts from "./pages/LikedPosts/LikedPosts";
import SinglePost from "./pages/Posts/SinglePost";
import UserProfile from "./pages/userprofile/UserProfile";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
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
