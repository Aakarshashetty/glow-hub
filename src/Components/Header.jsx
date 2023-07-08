import React from "react";
import { MdPersonSearch } from "react-icons/md";

const Header = () => {
  return (
    <header>
      <div className="brand-name">
      <img src="https://res.cloudinary.com/dbiove79b/image/upload/v1688715619/glow-hub/image_3_h3r04b.png" alt="brand-icon" width={30} height={30}/>
      <h2>Glow Hub</h2>
      </div>
      <div className="input">
        <MdPersonSearch className="search-icon" />
        <input type="text" placeholder="search user" />
      </div>
    </header>
  );
};

export default Header;
