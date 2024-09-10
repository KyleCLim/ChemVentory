import React, { useState, useEffect } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import axios from "axios";

const AdminActHistory = () => {
    const [transactionList, setTransactionList] = useState([]);

    const capFirstLetter = (str) => {
        if (!str || str.trim() === "") {
            return "already deleted chemical";
        }
        return str
            .split(" ")
            .map((word) => {
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join(" ");
    };

    // const handleDeleteItem = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8800/api/admin/${id}`, {
    //             withCredentials: true,
    //         });
    //         // Remove the deleted item from the state to update the UI
    //         setTransactionList((prevItems) =>
    //             prevItems.filter((item) => item.transaction_id !== id)
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/admin/admin-trasactionlog`,
                    { withCredentials: true }
                );
                setTransactionList(res.data);
            } catch (err) {}
        };
        fetchData();
    }, []);

    return (
        <div className="adminActHistoryContainer">
            <TableContainer className="userAccntsTable">
                <TableHead>
                    <TableRow>
                        {[
                            "Timestamp",
                            "User",
                            "Event",
                            "Qty",
                            "Description",
                            // "Delete",
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
                    {transactionList.map((transaction, index) => {
                        console.log(transaction);
                        return (
                            <TableRow key={transaction.transaction_id}>
                                <TableCell align="center">
                                    {/* {formattedTimestamp} */}
                                    {transaction.created_at}
                                </TableCell>
                                <TableCell align="center">
                                    {transaction.lname}, {transaction.fname}
                                </TableCell>
                                <TableCell align="center">
                                    {transaction.type}
                                </TableCell>
                                <TableCell align="center">
                                    {transaction.quantity} {transaction.unit}
                                </TableCell>
                                <TableCell align="center">
                                    {transaction.type} of{" "}
                                    {capFirstLetter(transaction.chem_name)} was
                                    conducted
                                </TableCell>
                                {/* <TableCell align="center">
                                    <div className="actionAdminIconsContainer">
                                        <button
                                            className="actionIcons"
                                            onClick={() =>
                                                handleDeleteItem(
                                                    transaction.transaction_id
                                                )
                                            }
                                        >
                                            <box-icon
                                                name="trash"
                                                color="rgb(203, 112, 112)"
                                            />
                                        </button>
                                    </div>
                                </TableCell> */}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
        </div>
    );
};

export default AdminActHistory;
