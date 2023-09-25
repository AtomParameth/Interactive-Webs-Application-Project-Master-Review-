import React from "react";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import "./DropDownMenu.css";

function DropdownMenu() {
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    auth.signOut().then(() =>{
      setUser(null);
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="dropdown-container">
      {user ? (
        <ul className="dropdown-menu">
          <li className="profile-user">
            <img
              width={40}
              height={40}
              className="user-profile-image"
              style={{ borderRadius: "50%" }}
              src={user.photoURL}
              alt="User Profile"
            />
            <p className="user-name">{user.displayName}</p>
          </li>
          <li className="sign-out">
            <button className="sign-out-dropdown">
              <li onClick={handleSignOut}>Sign Out</li>
            </button>
          </li>
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DropdownMenu;
