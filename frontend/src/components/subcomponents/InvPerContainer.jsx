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
import axios from "axios";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import { useAlert } from "../../context/AlertContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const InvPerContainer = () => {
    const [search, setSearch] = useState("");
    const [inventory, setInventory] = useState([]);
    const [usage, setUsage] = useState(0);
    const [addedQty, setAddedQty] = useState(0);
    const showAlert = useAlert();

    const handleFavoriteToggle = async (id, currentStatus) => {
        const updatedStatus = currentStatus === 1 ? 0 : 1;
        try {
            // Update the favorite status in the backend
            await axios.put(
                `http://localhost:8800/api/inventory/add-watchlist/${id}`,
                { isfavorite: updatedStatus },
                { withCredentials: true }
            );
            // Update the local state to reflect the new favorite status
            setInventory((prevItems) =>
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

    const handleChemUsage = async (id, initQty, unit) => {
        try {
            await axios.put(
                `http://localhost:8800/api/transacts/use-chem/${id}`,
                { usageQty: usage, initialQty: initQty, unit },
                {
                    withCredentials: true,
                }
            );
            showAlert("Updated item usage", "info");
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    const handleAddedQty = async (id, initQty, unit) => {
        try {
            await axios.put(
                `http://localhost:8800/api/transacts/add-qty/${id}`,
                { usageQty: addedQty, initialQty: initQty, unit },
                {
                    withCredentials: true,
                }
            );
            showAlert("Successfully added quantity", "info");
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
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

    const handleSearch = () => {
        return inventory.filter(
            (item) =>
                item.chem_name.toLowerCase().includes(search) ||
                item.brand.toLowerCase().includes(search) ||
                item.supplier.toLowerCase().includes(search)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/inventory/inv-per-container`,
                    { withCredentials: true }
                );
                setInventory(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="invPerContainer">
            <TextField
                label="Search for Chemical/Brand/Source"
                color="secondary"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer className="tableContainer">
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
                            "Actions",
                        ].map((head, index) => (
                            <TableCell
                                key={index}
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
                        const mfgDate = new Date(item.mfg_date);
                        const expDate = new Date(item.exp_date);
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
                                    {formattedMfgDate}
                                </TableCell>
                                <TableCell align="center">
                                    {formattedExpDate}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="actionInvIconsContainer">
                                        <EditModal
                                            id={item.item_id}
                                            name={item.chem_name}
                                            chemBrand={item.brand}
                                            cas={item.cas_num}
                                            qty={item.quantity}
                                            unitQty={item.unit}
                                            batch={item.batch_code}
                                            chemLoc={item.location}
                                            chemSup={item.supplier}
                                            chemLocalCode={item.local_code}
                                            chemNote={item.note}
                                            mfg={item.mfg_date}
                                            exp={item.exp_date}
                                        />
                                        <DeleteModal
                                            id={item.item_id}
                                            name={item.chem_name}
                                            setInventory={setInventory}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
            {inventory.length < 1 && (
                <h4 className="emptyNotice">Your inventory is empty</h4>
            )}
        </div>
    );
};

export default InvPerContainer;
