import React from "react";
import { MdPersonSearch } from "react-icons/md";
import { usePosts } from "../contexts/post-context";
import { useNavigate } from "react-router";

const Header = () => {
  const { postDispatcher } = usePosts();
  const navigate = useNavigate();
  return (
    <header>
      <div className="brand-name">
        <img
          src="https://res.cloudinary.com/dbiove79b/image/upload/v1688715619/glow-hub/image_3_h3r04b.png"
          alt="brand-icon"
          width={30}
          height={30}
          onClick={() => navigate("/")}
        />
        <h2 onClick={() => navigate("/")}>Glow Hub</h2>
      </div>
      <div className="input">
        <MdPersonSearch className="search-icon" />
        <input
          type="text"
          placeholder="search user"
          onChange={(e) =>
            postDispatcher({ type: "SEARCH_USER", payload: e.target.value })
          }
        />
      </div>
    </header>
  );
};

export default Header;
