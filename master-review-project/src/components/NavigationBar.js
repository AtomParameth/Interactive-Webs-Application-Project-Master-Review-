import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";


function Navbar() {
    return(
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo"></Link>
                <Link to="signin" className="sign-in-btn">sign in</Link>
            </div>
        </nav>
        </>
    )
}

export default Navbar;