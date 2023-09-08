import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo-roject.svg"
import "./Navbar.css";
function Navbar() {
    return (
        <nav>
            <div className="logo" >
                <Link to="/"><img src={logo} /></Link>
            </div>
            <div className="sign-in">
                <Link to="/sign-in">
                    <button className="sign-button">sign in</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar