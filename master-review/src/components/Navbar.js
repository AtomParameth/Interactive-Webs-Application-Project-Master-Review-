import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo-roject.svg";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { auth } from "../firebase"; 
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        {user ? (
          <div className="profile-user-container">
            <div className="profile">
              <img
                width={40}
                height={40}
                className="user-profile-image"
                style={{ borderRadius: "50%" }}
                src={user.photoURL}
                alt="User Profile"
              />
            </div>
            <div className="signOut-container">
              <button
                onClick={() => auth.signOut()}
                className="sign-out-button"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="sign-in">
            <Link to="/sign-in">
              <button className="sign-button">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
