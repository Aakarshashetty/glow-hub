import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";
import { PostContextProvider } from "./contexts/post-context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Call make Server
makeServer();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
