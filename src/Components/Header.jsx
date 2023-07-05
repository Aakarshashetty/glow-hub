import React from "react";
import { MdPersonSearch } from "react-icons/md";

const Header = () => {
  return (
    <header>
      <h2>Glow Hub</h2>
      <div className="input">
        <MdPersonSearch className="search-icon" />
        <input type="text" placeholder="search user" />
      </div>
    </header>
  );
};

export default Header;
