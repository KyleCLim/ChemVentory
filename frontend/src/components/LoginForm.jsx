import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useAlert } from "../context/AlertContext";

const LoginForm = () => {
    const [inputs, setInputs] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const showAlert = useAlert();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateInputs = () => {
        const { username, password } = inputs;
        if (!username || !password) {
            showAlert("All fields are required", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            await login(inputs);

            navigate("/dashboard");
            showAlert("Login successful", "success");
        } catch (err) {
            if (err.response && err.response.data) {
                // Display the error message returned from the backend
                showAlert(err.response.data, "error");
            } else {
                showAlert("An error occurred during login", "error");
            }
        }
    };

    return (
        <div className="loginFormContainer">
            <h2 className="formHeading">Login</h2>
            <div className="formBox">
                <form className="loginForm">
                    <input
                        className="loginInputs"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="loginInputs"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <div className="loginButton">
                        <button
                            className="submitButton"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="forRegister">
                        <p>
                            No account yet? Sign up{" "}
                            <span>
                                <a href="/signup">here</a>.
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
