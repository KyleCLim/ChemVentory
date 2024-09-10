import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";

const UpdateUserInfo = ({
    fName,
    lName,
    userName,
    Email,
    type,
    Department,
    employee_Id,
    id,
}) => {
    const [fname, setFname] = useState(fName);
    const [lname, setLname] = useState(lName);
    const [username, setUsername] = useState(userName);
    const [email, setEmail] = useState(Email);
    const [accnt_type, seAccnt_type] = useState(type === "Regular" ? 2 : 1);
    const [department, setDepartment] = useState(Department);
    const [employee_id, setEmployee_id] = useState(employee_Id);
    const showAlert = useAlert();

    const handleClick = async (id) => {
        try {
            await axios.put(
                `http://localhost:8800/api/admin/update-user/${id}`,
                {
                    fname,
                    lname,
                    username,
                    email,
                    accnt_type,
                    department,
                    employee_id,
                },
                { withCredentials: true }
            );
            showAlert("Successfully updated user in the list", "success");
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    return (
        <div>
            <h2 className="modalHeader">Update User Information</h2>
            <form>
                <div className="inputModalContainer">
                    <label for="fname">First Name:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="fname"
                        placeholder={fName}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <label for="lname" className="modalRightLabel">
                        Last Name:
                    </label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="lname"
                        placeholder={lName}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <label for="username">Username:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="username"
                        placeholder={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label for="email" className="modalRightLabel">
                        Email:
                    </label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="email"
                        placeholder={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <label for="username">Facility ID:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="department"
                        placeholder={Department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <label for="accnt_type" className="modalRightLabel">
                        Account Type:
                    </label>
                    <select
                        // className="userInputBox modalRightLabel"
                        className="modalInputBox"
                        name="accnt_type"
                        onChange={(e) => seAccnt_type(e.target.value)}
                        required
                    >
                        <option className="accountType" disabled selected>
                            {type}
                        </option>
                        <option value={1}>Admin</option>
                        <option value={2}>Regular</option>
                    </select>
                </div>
                <div className="inputModalContainer">
                    <label for="employee_id">Employee ID:</label>
                    <input
                        className="modalInputBox updateUserEmpIdBox"
                        type="text"
                        name="employee_id"
                        placeholder={employee_Id}
                        onChange={(e) => setEmployee_id(e.target.value)}
                    />
                </div>
                <div className="addButtonContainer">
                    <button
                        className="addButton"
                        onClick={() => handleClick(id)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserInfo;
