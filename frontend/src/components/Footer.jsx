import React from "react";

const Footer = () => {
    const yearNow = new Date().getFullYear();
    return (
        <div className="footerContainer">
            <div className="footerRightLists">
                <p>ⓒ {yearNow} All rights reserved</p>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of service</a>
            </div>
        </div>
    );
};

export default Footer;
