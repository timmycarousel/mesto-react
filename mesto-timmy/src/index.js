import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="html">
    <div className="page">
      <Header />
      <App />
      <Footer />
    </div>
  </div>
);
reportWebVitals();
