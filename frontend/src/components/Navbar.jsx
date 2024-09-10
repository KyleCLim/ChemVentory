import React, { useContext } from "react";
import NavDrawer from "./NavDrawer";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact", link: "/contact" },
];

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div
            style={{ backgroundColor: "rgba(131, 88, 141, 0.7)" }}
            className="navbarContainer"
        >
            <div className="navbarLogo">
                <a href={!currentUser ? "/" : "/dashboard"}>
                    <img className="logo" src="logo.png" alt="logo" />
                </a>
            </div>
            <NavDrawer navItems={navItems} />
            <div className="navbarButtons">
                {!currentUser &&
                    navItems.map((item) => (
                        <a href={item.link} key={item.name}>
                            {item.name}
                        </a>
                    ))}
                {currentUser ? (
                    <button className="logButton" onClick={logout}>
                        Log Out
                    </button>
                ) : (
                    <Link to="/signup">
                        <button className="logButton">Sign Up</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
