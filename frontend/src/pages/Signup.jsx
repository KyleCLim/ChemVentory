import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

const Signup = () => {
    const [inputs, setInputs] = useState({
        fName: "",
        lName: "",
        username: "",
        email: "",
        password: "",
        accntType: "",
        department: "",
        employeeID: "",
    });
    // const [err, setError] = useState(null);
    const navigate = useNavigate();
    const showAlert = useAlert();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputs.password !== inputs.confirmPassword) {
            // setError("Passwords do not match");
            showAlert("Passwords do not match", "error");
            return; // Prevent form submission if passwords don't match
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputs.email)) {
            showAlert("Please enter a valid email address", "error");
            return;
        }

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            navigate("/");
            showAlert("User successfully registered", "success");
        } catch (err) {
            // setError(err.response.data);
            console.log(err);
            showAlert(err, "error");
        }
    };

    return (
        <div className="signupContainer">
            <form className="signupContent">
                <h2 className="formHeading">Sign Up</h2>
                <div className="signupInputs">
                    <input
                        className="userInputBox"
                        type="text"
                        name="fName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="userInputBox"
                        type="text"
                        name="lName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signupInputs">
                    <input
                        className="userInputBox"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="userInputBox"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signupInputs">
                    <input
                        className="userInputBox"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="userInputBox"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                    />
                    <select
                        className="userInputBox"
                        id="accntType"
                        name="accntType"
                        placeholder="Account Type"
                        onChange={handleChange}
                        required
                    >
                        <option className="accountType" disabled selected>
                            Account Type
                        </option>
                        <option value={1}>Admin</option>
                        <option value={2}>Regular</option>
                    </select>
                </div>
                <div className="signupInputs">
                    <input
                        className="userInputBox"
                        type="text"
                        name="department"
                        placeholder="Department/Facility ID"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="userInputBox"
                        type="text"
                        name="employeeID"
                        placeholder="Employee ID Num"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="submitButton" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
