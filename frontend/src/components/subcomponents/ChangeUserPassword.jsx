import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";

const ChangeUserPassword = ({ id, handleClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const showAlert = useAlert();

    const handleClick = async (e, id) => {
        e.preventDefault();
        try {
            let res = await axios.put(
                `http://localhost:8800/api/admin/change-password/${id}`,
                {
                    oldPassword,
                    newPassword,
                },
                { withCredentials: true }
            );
            if (res.data.success) {
                showAlert(res.data.message, "success");
                setTimeout(() => {
                    handleClose();
                }, 2000);
            } else {
                showAlert(res.data.message, "error");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                showAlert(err.response.data.message, "error");
            } else {
                showAlert(
                    "An error occurred while updating the password",
                    "error"
                );
            }
        }
    };

    return (
        <div>
            <h2 className="modalHeader">Change User Password</h2>
            <form>
                <div className="inputModalContainer">
                    <label for="oldPassword">Old Password:</label>
                    <input
                        className="modalInputBox"
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="inputModalContainer">
                    <label for="newPassword">New Password:</label>
                    <input
                        className="modalInputBox"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="addButtonContainer">
                    <button
                        className="addButton"
                        onClick={(e) => handleClick(e, id)}
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangeUserPassword;
