import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import * as XLSX from "xlsx/xlsx.mjs";
import { useAlert } from "../../context/AlertContext";
import { getTransactionHistory } from "../../api/apiService";

const DownloadInfoModal = ({ id, name, chemBrand, batch, chemSup }) => {
    const [transactions, setTransactions] = useState([]);
    const showAlert = useAlert();

    const downloadTableAsExcel = () => {
        // Get the table element
        let table = document.getElementById("myTable");

        // Create a new workbook and add the table
        let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

        // Generate Excel file and trigger the download
        XLSX.writeFile(wb, "table.xlsx");
        showAlert("Successfully downloaded excel file", "success");
    };

    const capFirstLetter = (str) => {
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
                const res = await getTransactionHistory(id);
                setTransactions(res.data);
            } catch (err) {
                console.log(err);
                showAlert("Error in getting transaction history", "error");
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="downloadInfoContainer">
            <div className="downloadInfoHeader">
                <button onClick={() => downloadTableAsExcel()}>
                    <box-icon name="download" type="solid" />
                </button>
            </div>
            <div className="downloadTableContainer">
                <TableContainer id="myTable">
                    <TableHead>
                        <TableRow>
                            <h2>{capFirstLetter(name)}</h2>
                        </TableRow>
                        <TableRow>
                            <p>Brand: {capFirstLetter(chemBrand)}</p>
                        </TableRow>
                        <TableRow>
                            <p>Batch: {batch}</p>
                        </TableRow>
                        <TableRow>
                            <p className="supRow">
                                Supplier: {capFirstLetter(chemSup)}
                            </p>
                        </TableRow>
                        <TableRow>
                            {[
                                "Transaction Type",
                                "User",
                                "Quantity",
                                "Unit",
                                "Timestamp",
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
                        {transactions.map((transact, index) => {
                            let timestamp = format(
                                new Date(transact.created_at),
                                "yyyy-MM-dd HH:mm:ss"
                            );
                            return (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {transact.type}
                                    </TableCell>
                                    <TableCell align="center">
                                        {transact.lname}, {transact.fname}
                                    </TableCell>
                                    <TableCell align="center">
                                        {transact.quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                        {transact.unit}
                                    </TableCell>
                                    <TableCell align="center">
                                        {timestamp}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </TableContainer>
            </div>
        </div>
    );
};

export default DownloadInfoModal;
