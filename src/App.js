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
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <header>
          <h2>Glow Hub</h2>
          <input type='text' placeholder='search user'/>
        </header>
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:postId" element={<SinglePost />} />
      </Routes>
    </div>
  );
}

export default App;
