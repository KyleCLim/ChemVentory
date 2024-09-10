import React, { useState, useContext } from "react";
import MyInventory from "../components/MyInventory";
import AddChemical from "../components/AddChemical";
import MyWatchlist from "../components/MyWatchlist";
import Administration from "../components/Administration";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
    const [activeButton, setActiveButton] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const [content, setContent] = useState(<MyInventory />);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const changeContent = (page) => {
        setContent(page);
    };

    const buttons = [
        {
            name: " My Inventory",
            icon: "cabinet",
            type: "",
            page: <MyInventory />,
        },
        {
            name: " Add Chemical",
            icon: "flask",
            type: "solid",
            page: <AddChemical />,
        },
        {
            name: " My Watchlist",
            icon: "list-ul",
            type: "",
            page: <MyWatchlist />,
        },
        {
            name: " Administration",
            icon: "cog",
            type: "",
            page: <Administration />,
        },
    ];

    return (
        <div className="dashboardContainer">
            <div className="dashboardButtonsBox">
                {buttons
                    .filter(
                        (btn) =>
                            !(
                                currentUser.user_id === 2 &&
                                btn.name === " Administration"
                            )
                    )
                    .map((btn, index) => (
                        <button
                            className="dashboardButton"
                            key={index}
                            onClick={() => {
                                handleButtonClick(index);
                                changeContent(btn.page);
                            }}
                            style={{
                                backgroundColor:
                                    activeButton === index
                                        ? "#bca9c0"
                                        : "white",
                            }}
                        >
                            <box-icon name={btn.icon} type={btn.type} />
                            {btn.name}
                        </button>
                    ))}
                <p>
                    Signed in as{" "}
                    <span className="userLabel">
                        {currentUser?.fname}, {currentUser?.lname}
                    </span>
                </p>
            </div>
            <div className="dashboardContent">{content}</div>
        </div>
    );
};

export default Dashboard;
