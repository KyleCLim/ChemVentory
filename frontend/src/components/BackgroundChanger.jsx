import React, { useEffect, useState } from "react";
import "../App.css";

const BackgroundChanger = () => {
    const images = [
        'url("home_backgrounds/laboratory_1.jpg")',
        'url("home_backgrounds/laboratory_2.jpg")',
        'url("home_backgrounds/laboratory_3.jpg")',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <div
            className="background"
            style={{ backgroundImage: images[currentIndex] }}
        />
    );
};

export default BackgroundChanger;
