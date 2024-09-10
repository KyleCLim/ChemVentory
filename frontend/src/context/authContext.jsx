import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // Get's the current user's info from the local storage
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        // console.log("login input", inputs);
        const res = await axios.post(
            "http://localhost:8800/api/auth/login/",
            inputs,
            { withCredentials: true }
        );

        // Set user data to local storage
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
    };

    const logout = async (inputs) => {
        await axios.post("http://localhost:8800/api/auth/logout");
        setCurrentUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    ////////////////////
    useEffect(() => {
        if (currentUser) {
            // If the user is logged in, redirect to "/dashboard"
            navigate("/dashboard");
        }
    }, [currentUser, navigate]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AlertState = () => {
    return useContext(AuthContext);
};
