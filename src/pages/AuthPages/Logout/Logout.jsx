import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Logout = () => {
  return (
    
      <div  className="logout" style={{ paddingTop: "5rem" }}>
        <h4>Popup - GeeksforGeeks</h4>
        <Popup trigger={<button> Click to open modal </button>} modal nested style={{ paddingTop: "5rem" }}>
          {(close) => (
            <div className="modal">
              <div className="content">Welcome to GFG!!!</div>
              <div>
                <button onClick={() => close()}>Close modal</button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    
  );
};

export default Logout;
