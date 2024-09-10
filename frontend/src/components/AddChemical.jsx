import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../context/AlertContext";

const AddChemical = () => {
    const [chemName, setChemName] = useState("");
    const [brand, setBrand] = useState("");
    const [casNum, setCasNum] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [location, setLocation] = useState("");
    const [supplier, setSupplier] = useState("");
    const [mfgDate, setMfgDate] = useState("");
    const [expDate, setExpDate] = useState("");
    const [localCode, setLocalCode] = useState("");
    const [note, setNote] = useState("");
    const showAlert = useAlert();

    const handleClick = async (e) => {
        // e.preventDefault();
        try {
            await axios.post(
                `http://localhost:8800/api/transacts/add-chem`,
                {
                    chemName,
                    brand,
                    casNum,
                    quantity,
                    unit,
                    batchCode,
                    location,
                    supplier,
                    mfgDate,
                    expDate,
                    localCode,
                    note,
                },
                { withCredentials: true }
            );
            showAlert("Item added to inventory successfully", "info");
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    return (
        <div className="addChemContainer">
            <form className="addChemForm">
                <h2 className="addChemHeader">ADD CHEMICAL TO INVENTORY</h2>
                <label for="chemName">Chemical Name:</label>
                <input
                    type="text"
                    name="chemName"
                    placeholder="Enter Chemical Name"
                    onChange={(e) => setChemName(e.target.value)}
                />
                <label for="brand">Brand Name:</label>
                <input
                    type="text"
                    name="brand"
                    placeholder="Enter Brand Name"
                    onChange={(e) => setBrand(e.target.value)}
                />
                <label for="casNum">CAS Number:</label>
                <input
                    type="text"
                    name="casNum"
                    placeholder="CAS Registry Number"
                    onChange={(e) => setCasNum(e.target.value)}
                />
                <div className="inputContainer">
                    <label for="quantity">Quantity Size:</label>
                    <div>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Size of Container"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select
                            className="addChemInputDetails"
                            name="unit"
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option>μg</option>
                            <option>mg</option>
                            <option>g</option>
                            <option>kg</option>
                            <option>lbs</option>
                            <option>oz</option>
                            <option>μl</option>
                            <option>mL</option>
                            <option>L</option>
                            <option>mmol</option>
                            <option>units</option>
                            <option>gal</option>
                            <option>tank</option>
                            <option>bottle</option>
                        </select>
                    </div>
                </div>
                <label for="batchCode">Batch Code:</label>
                <input
                    type="text"
                    name="batchCode"
                    placeholder="Batch Code"
                    onChange={(e) => setBatchCode(e.target.value)}
                />
                <label for="location">Location:</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Storage Location"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label for="supplier">Supplier:</label>
                <input
                    type="text"
                    name="supplier"
                    placeholder="Item Supplier"
                    onChange={(e) => setSupplier(e.target.value)}
                />
                <div className="inputContainer">
                    <label for="mfgDate">Manufacturing Date:</label>
                    <input
                        className="addChemInputDetails"
                        type="date"
                        name="mfgDate"
                        placeholder="Manufacturing Date"
                        onChange={(e) => setMfgDate(e.target.value)}
                    />
                    <label for="expDate" className="expDate">
                        Expiry Date:
                    </label>
                    <input
                        className="addChemInputDetails"
                        type="date"
                        name="expDate"
                        placeholder="Expiry Date"
                        onChange={(e) => setExpDate(e.target.value)}
                    />
                </div>
                <label for="localCode">Local Code:</label>
                <input
                    type="text"
                    name="localCode"
                    placeholder="Local Code"
                    onChange={(e) => setLocalCode(e.target.value)}
                />
                <label for="note">Note:</label>
                <input
                    type="text"
                    name="note"
                    placeholder="Add Note"
                    onChange={(e) => setNote(e.target.value)}
                />
                <div className="addButtonContainer">
                    <button className="addButton" onClick={handleClick}>
                        Add Chemical
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddChemical;
