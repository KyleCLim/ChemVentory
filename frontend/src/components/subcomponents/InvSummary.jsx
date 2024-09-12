import React, { useEffect, useState } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TextField,
    TableRow,
    TableCell,
} from "@mui/material";
import { capFirstLetter, formatDate } from "../../utils/helpers";
import { getInventorySummary } from "../../api/apiService";

const InvSummary = () => {
    const [search, setSearch] = useState("");
    const [inventorySummary, setInventorySummary] = useState([]);

    const handleSearch = () => {
        return inventorySummary.filter((item) =>
            item.chem_name.toLowerCase().includes(search)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getInventorySummary();
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
                                    {formatDate(item.oldest_mfg_date)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatDate(item.nearest_expiry_date)}
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
