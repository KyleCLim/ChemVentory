import React from "react";

const UserForm = ({ inputs, handleChange, handleSubmit }) => {
    return (
        <form className="adminAddUserForm" onSubmit={handleSubmit}>
            <h2 className="addAccntHeader">ADD USER ACCOUNT</h2>
            <div className="signupInputs">
                <input
                    className="userInputBox"
                    type="text"
                    name="fName"
                    placeholder="First Name"
                    value={inputs.fName}
                    onChange={handleChange}
                    required
                />
                <input
                    className="userInputBox"
                    type="text"
                    name="lName"
                    placeholder="Last Name"
                    value={inputs.lName}
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
                    value={inputs.username}
                    onChange={handleChange}
                    required
                />
                <input
                    className="userInputBox"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputs.email}
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
                    value={inputs.password}
                    onChange={handleChange}
                    required
                />
                <input
                    className="userInputBox"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={inputs.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <select
                    className="userInputBox"
                    name="accntType"
                    value={inputs.accntType}
                    onChange={handleChange}
                    required
                >
                    <option disabled value="">
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
                    value={inputs.department}
                    onChange={handleChange}
                    required
                />
                <input
                    className="userInputBox"
                    type="text"
                    name="employeeID"
                    placeholder="Employee ID Num"
                    value={inputs.employeeID}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="addUserButton">
                Add User
            </button>
        </form>
    );
};

export default UserForm;
