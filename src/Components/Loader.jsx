import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <section className="dots-container">
      <div className="dots-content">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </section>
  );
};

export default Loader;
