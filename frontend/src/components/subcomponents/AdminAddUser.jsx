import React, { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { registerUser } from "../../api/apiService";
import { validateEmail, validatePasswords } from "../../utils/validations";
import UserForm from "../UserForm";

const AdminAddUser = () => {
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

    const showAlert = useAlert();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePasswords(inputs.password, inputs.confirmPassword)) {
            showAlert("Passwords do not match", "error");
            return;
        }

        if (!validateEmail(inputs.email)) {
            showAlert("Please enter a valid email address", "error");
            return;
        }

        try {
            await registerUser(inputs);
            showAlert("User successfully registered", "success");
        } catch (err) {
            console.error(err);
            showAlert("Error registering user", "error");
        }
    };

    return (
        <div className="adminAddUserContainer">
            <UserForm
                inputs={inputs}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AdminAddUser;
