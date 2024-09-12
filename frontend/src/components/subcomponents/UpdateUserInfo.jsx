import React, { useState } from "react";
// import axios from "axios";
import { useAlert } from "../../context/AlertContext";
import UpdateUserForm from "../UpdateUserForm";
import { updateUser } from "../../api/apiService";

const UpdateUserInfo = ({
    fName,
    lName,
    userName,
    Email,
    type,
    Department,
    employee_Id,
    id,
    handleClose,
}) => {
    const showAlert = useAlert();

    const initialUserState = {
        fname: fName,
        lname: lName,
        username: userName,
        email: Email,
        accnt_type: type === "Regular" ? 2 : 1,
        department: Department,
        employee_id: employee_Id,
    };
    const [user, setUser] = useState(initialUserState);

    const handleChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            showAlert("Successfully updated user in the list", "success");
            // setTimeout(() => {
            //     handleClose();
            // }, 2000);
        } catch (err) {
            console.error(err);
            showAlert(err.message, "error");
        }
    };

    return (
        <div>
            <h2 className="modalHeader">Update User Information</h2>
            <UpdateUserForm user={user} onChange={handleChange} />
            <div className="addButtonContainer">
                <button className="addButton" onClick={(e) => handleClick(e)}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default UpdateUserInfo;
