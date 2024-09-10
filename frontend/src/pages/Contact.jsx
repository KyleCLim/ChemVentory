import React from "react";

const Contact = () => {
    return (
        <div className="contactPageContainer">
            <div className="contactPageContent">
                <h1 className="headerTitle">Contact Us</h1>
                <h2>Get in touch with us.</h2>
                <h2>We'd love to hear from you.</h2>
                <p className="contactText">
                    If you have any questions about what ChemInventory can do or
                    would like some more information about our software, please
                    send an email to our support address below. We'll get back
                    to you ASAP
                </p>
                <a className="contactLink" href="#">
                    support@chemventory.dev
                </a>
            </div>
        </div>
    );
};

export default Contact;
