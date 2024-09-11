import React, { useEffect, useState } from "react";
import {
    TableContainer,
    TableHead,
    TableBody,
    TextField,
    TableRow,
    TableCell,
    Checkbox,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { amber } from "@mui/material/colors";
import { useAlert } from "../context/AlertContext";
import {
    updateFavoriteStatus,
    getWatchlist,
    updateChemUsage,
    addChemicalQty,
} from "../api/apiService";
import { capFirstLetter, formatDate } from "../utils/helpers";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const MyWatchlist = () => {
    const [search, setSearch] = useState("");
    const [watchlist, setWatchlist] = useState([]);
    const [usage, setUsage] = useState(0);
    const [addedQty, setAddedQty] = useState(0);
    const showAlert = useAlert();

    const handleFavoriteToggle = async (id, currentStatus) => {
        const updatedStatus = currentStatus === 1 ? 0 : 1;
        try {
            await updateFavoriteStatus(id, currentStatus);
            // Update the local state to reflect the new favorite status
            setWatchlist((prevItems) =>
                prevItems.map((item) =>
                    item.item_id === id
                        ? { ...item, isfavorite: updatedStatus }
                        : item
                )
            );
            showAlert("Successfully updated watchlist", "info");
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    const handleChemUsage = async (id, usageQty, initialQty, unit) => {
        if (parseFloat(usage) > parseFloat(initialQty)) {
            showAlert("Usage quantity exceeds available stock", "error");
            return;
        }

        try {
            await updateChemUsage(id, usageQty, initialQty, unit);
            showAlert("Chemical usage updated", "info");
        } catch (err) {
            console.error(err);
            showAlert("Error updating chemical usage", "error");
        }
    };

    const handleAddedQty = async (id, addedQty, initialQty, unit) => {
        try {
            await addChemicalQty(id, addedQty, initialQty, unit);
            showAlert("Quantity added successfully", "info");
        } catch (err) {
            console.error(err);
            showAlert("Error adding quantity", "error");
        }
    };

    const handleSearch = () => {
        return watchlist.filter(
            (item) =>
                item.chem_name.toLowerCase().includes(search) ||
                item.brand.toLowerCase().includes(search) ||
                item.supplier.toLowerCase().includes(search)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getWatchlist();
                setWatchlist(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="myWatchlistContainer">
            <h2 className="watchlistHeader">MY WATCHLIST</h2>
            <TextField
                label="Search for Chemical/Brand/Source"
                color="secondary"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
                <TableHead>
                    <TableRow>
                        {[
                            "",
                            "Name",
                            "Brand",
                            "Source",
                            "Batch code",
                            "Code",
                            "Stor Loc",
                            "Quantity",
                            "Unit",
                            "Use Qty",
                            "Add Qty",
                            "Mfg Date",
                            "Exp Date",
                            // "Action",
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
                        const chemQty = item.quantity;
                        const usageUnit = item.unit;

                        return (
                            <TableRow key={item.item_id} className="tableRow">
                                <TableCell align="center">
                                    <Checkbox
                                        {...label}
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<BookmarkIcon />}
                                        color="default"
                                        sx={{
                                            "&.Mui-checked": {
                                                color: amber[600],
                                            },
                                        }}
                                        checked={item.isfavorite === 1}
                                        onChange={(e) => {
                                            handleFavoriteToggle(
                                                item.item_id,
                                                item.isfavorite
                                            );
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {capFirstLetter(item.chem_name)}
                                </TableCell>
                                <TableCell align="center">
                                    {capFirstLetter(item.brand)}
                                </TableCell>
                                <TableCell align="center">
                                    {capFirstLetter(item.supplier)}
                                </TableCell>
                                <TableCell align="center">
                                    {item.batch_code}
                                </TableCell>
                                <TableCell align="center">
                                    {item.local_code}
                                </TableCell>
                                <TableCell align="center">
                                    {item.location}
                                </TableCell>
                                <TableCell align="center">
                                    {item.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {item.unit}
                                </TableCell>
                                <TableCell>
                                    <form className="invInputForm">
                                        <input
                                            className="invInput"
                                            type="number"
                                            step="any"
                                            name="usage"
                                            onChange={(e) =>
                                                setUsage(e.target.value)
                                            }
                                        />
                                        <button
                                            className="actionIcons"
                                            onClick={() =>
                                                handleChemUsage(
                                                    item.item_id,
                                                    usage,
                                                    chemQty,
                                                    usageUnit
                                                )
                                            }
                                        >
                                            USE
                                        </button>
                                    </form>
                                </TableCell>
                                <TableCell>
                                    <form className="invInputForm">
                                        <input
                                            className="invInput"
                                            type="number"
                                            step="any"
                                            name="addedQty"
                                            onChange={(e) =>
                                                setAddedQty(e.target.value)
                                            }
                                        />
                                        <button
                                            className="actionIcons"
                                            onClick={() =>
                                                handleAddedQty(
                                                    item.item_id,
                                                    addedQty,
                                                    chemQty,
                                                    usageUnit
                                                )
                                            }
                                        >
                                            ADD
                                        </button>
                                    </form>
                                </TableCell>
                                <TableCell align="center">
                                    {/* {formattedMfgDate} */}
                                    {formatDate(item.mfg_date)}
                                </TableCell>
                                <TableCell align="center">
                                    {/* {formattedExpDate} */}
                                    {formatDate(item.exp_date)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
            {watchlist.length < 1 && (
                <h4 className="emptyNotice">Your watchlist is empty</h4>
            )}
        </div>
    );
};

export default MyWatchlist;
