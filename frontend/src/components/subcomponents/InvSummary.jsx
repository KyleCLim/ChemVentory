import React, { useEffect, useState } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TextField,
    TableRow,
    TableCell,
} from "@mui/material";
import axios from "axios";

const InvSummary = () => {
    const [search, setSearch] = useState("");
    const [inventorySummary, setInventorySummary] = useState([]);

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

    const handleSearch = () => {
        return inventorySummary.filter((item) =>
            item.chem_name.toLowerCase().includes(search)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/inventory/inv-summary`,
                    { withCredentials: true }
                );
                setInventorySummary(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="invSummaryContainer">
            <TextField
                label="Search Chemical"
                color="secondary"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
                <TableHead>
                    <TableRow>
                        {[
                            "Chemical Name",
                            "CAS Registry Num",
                            "Code",
                            "Remaining Quantity",
                            "Unit",
                            "Nearest Expiry Date",
                            "Oldest Manufacturing Date",
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
                    {handleSearch().map((item, index) => {
                        const mfgDate = new Date(item.oldest_mfg_date);
                        const expDate = new Date(item.nearest_expiry_date);
                        const format = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        };
                        const formattedMfgDate = mfgDate.toLocaleString(
                            "en-US",
                            format
                        );
                        const formattedExpDate = expDate.toLocaleString(
                            "en-US",
                            format
                        );
                        return (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    {capFirstLetter(item.chem_name)}
                                </TableCell>
                                <TableCell align="center">
                                    {item.cas_num}
                                </TableCell>
                                <TableCell align="center">
                                    {item.local_code}
                                </TableCell>
                                <TableCell align="center">
                                    {item.total_quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {item.unit}
                                </TableCell>
                                <TableCell align="center">
                                    {formattedExpDate}
                                </TableCell>
                                <TableCell align="center">
                                    {formattedMfgDate}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
            {inventorySummary.length < 1 && (
                <h4 className="emptyNotice">Your inventory is empty</h4>
            )}
        </div>
    );
};

export default InvSummary;
