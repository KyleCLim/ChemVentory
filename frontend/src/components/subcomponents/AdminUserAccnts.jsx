import React, { useEffect, useState, useContext } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { AuthContext } from "../../context/authContext";
import DeleteUserModal from "../DeleteUserModal";
import UpdateUserModal from "../UpdateUserModal";
import { getUserList } from "../../api/apiService";

const AdminUserAccnts = () => {
    const [userList, setUserList] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserList();
                setUserList(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="userAccountsContainer">
            <TableContainer className="userAccntsTable">
                <TableHead>
                    <TableRow>
                        {[
                            "Name",
                            "Username",
                            "Email Address",
                            "Employee ID",
                            "Department/Facility ID",
                            "Account Type",
                            "Actions",
                        ].map((head) => (
                            <TableCell
                                style={{
                                    color: "white",
                                    fontWeight: "700",
                                    backgroundColor: "#bca9c0",
                                }}
                                align="center"
                            >
                                {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* MAP ITEMS HERE */}
                    {userList.map((user, index) => {
                        return (
                            <TableRow key={user.user_id}>
                                <TableCell align="center">
                                    {user.lname}, {user.fname}
                                </TableCell>
                                <TableCell align="center">
                                    {user.username}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.employee_id}
                                </TableCell>
                                <TableCell align="center">
                                    {user.department}
                                </TableCell>
                                <TableCell align="center">
                                    {user.type}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="actionAdminIconsContainer">
                                        <UpdateUserModal
                                            fName={user.fname}
                                            lName={user.lname}
                                            userName={user.username}
                                            Email={user.email}
                                            Password={user.password} //
                                            type={user.type}
                                            Department={user.department}
                                            employee_Id={user.employee_id}
                                            id={user.user_id}
                                        />
                                        {currentUser.user_id !==
                                            user.user_id && (
                                            <DeleteUserModal
                                                id={user.user_id}
                                                account={user.username}
                                                setUserList={setUserList}
                                            />
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
        </div>
    );
};

export default AdminUserAccnts;
