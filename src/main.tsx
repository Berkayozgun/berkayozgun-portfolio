import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
