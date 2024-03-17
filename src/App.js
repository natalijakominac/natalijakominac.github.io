import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Map from "./components/Map/Map";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    const usersEmail = localStorage.getItem("email");
    const usersPassword = localStorage.getItem("password");

    if (
      usersEmail &&
      usersEmail === email &&
      usersPassword &&
      usersPassword === password
    ) {
      localStorage.setItem("isLoggedIn", 1);
      setIsLoggedIn(true);

      navigate("/");
    }
  };

  const signUpHandler = (email, password) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    navigate("/login");
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", 0);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="page">
      <Header isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isLoggedIn} />} />
          <Route
            path="/login"
            element={<Login type="Login" onLogin={loginHandler} />}
          />
          <Route
            path="/sign-up"
            element={<Login type="Sign Up" onLogin={signUpHandler} />}
          />
          {isLoggedIn && <Route path="/map" element={<Map />} />}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
