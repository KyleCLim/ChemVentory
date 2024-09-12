import React from "react";

const UpdateUserForm = ({ user, onChange }) => {
    const {
        fname,
        lname,
        username,
        email,
        accnt_type,
        department,
        employee_id,
    } = user;

    return (
        <form>
            <div className="inputModalContainer">
                <label htmlFor="fname">First Name:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={(e) => onChange("fname", e.target.value)}
                />
                <label htmlFor="lname" className="modalRightLabel">
                    Last Name:
                </label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => onChange("lname", e.target.value)}
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="username">Username:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => onChange("username", e.target.value)}
                />
                <label htmlFor="email" className="modalRightLabel">
                    Email:
                </label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => onChange("email", e.target.value)}
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="department">Facility ID:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="department"
                    value={department}
                    onChange={(e) => onChange("department", e.target.value)}
                />
                <label htmlFor="accnt_type" className="modalRightLabel">
                    Account Type:
                </label>
                <select
                    className="modalInputBox"
                    name="accnt_type"
                    value={accnt_type}
                    onChange={(e) => onChange("accnt_type", e.target.value)}
                    required
                >
                    <option value={1}>Admin</option>
                    <option value={2}>Regular</option>
                </select>
            </div>
            <div className="inputModalContainer">
                <label htmlFor="employee_id">Employee ID:</label>
                <input
                    className="modalInputBox updateUserEmpIdBox"
                    type="text"
                    name="employee_id"
                    value={employee_id}
                    onChange={(e) => onChange("employee_id", e.target.value)}
                />
            </div>
        </form>
    );
};

export default UpdateUserForm;
