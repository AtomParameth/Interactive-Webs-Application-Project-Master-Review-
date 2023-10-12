import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo-roject.svg";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import DropdownMenu from "./DropMenu";
import "./SearchBar.css";
import SearchBar from "./SearchBar";

function Navbar({ onSearch }) {
  const [user, setUser] = useState(null);
  const [showdropdown, setShowdropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav>
        {showdropdown ? <DropdownMenu /> : null}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="searchBar-position">
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="cont">
          {user ? (
            <div
              className="profile-user-container"
              onClick={() => setShowdropdown(!showdropdown)}
            >
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
    </>
  );
}

export default Navbar;
