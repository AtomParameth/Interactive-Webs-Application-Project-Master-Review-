import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css"
export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link className="sign-in-btn">sign in</Link></li>
            </ul>
        </nav>
    )
}