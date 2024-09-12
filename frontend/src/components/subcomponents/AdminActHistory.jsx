import React, { useState, useEffect } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { getTransactionLog } from "../../api/apiService";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTransactionLog();
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
                                    {transaction.created_at}
                                </TableCell>
                                <TableCell align="center">
                                    {transaction.lname && transaction.fname
                                        ? `${transaction.lname}, ${transaction.fname}`
                                        : "Deleted user"}
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
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
        </div>
    );
};

export default AdminActHistory;
