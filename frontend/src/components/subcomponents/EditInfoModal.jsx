import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";

const EditInfoModal = ({
    id,
    name,
    chemBrand,
    cas,
    qty,
    unitQty,
    batch,
    chemLoc,
    chemSup,
    chemLocalCode,
    chemNote,
    mfg,
    exp,
}) => {
    const [chemName, setChemName] = useState(name);
    const [brand, setBrand] = useState(chemBrand);
    const [casNum, setCasNum] = useState(cas);
    const [quantity, setQuantity] = useState(qty);
    const [unit, setUnit] = useState(unitQty);
    const [batchCode, setBatchCode] = useState(batch);
    const [location, setLocation] = useState(chemLoc);
    const [supplier, setSupplier] = useState(chemSup);
    const [mfgDate, setMfgDate] = useState(mfg);
    const [expDate, setExpDate] = useState(exp);
    const [localCode, setLocalCode] = useState(chemLocalCode);
    const [note, setNote] = useState(chemNote);
    const showAlert = useAlert();

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

    const handleClick = async (id) => {
        // console.log(id);
        try {
            await axios.put(
                `http://localhost:8800/api/inventory/update-chem/${id}`,
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
            showAlert("Successfully updated item in inventory", "info");
            // e.preventDefault();
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    return (
        <div className="chemInfoModalContainer">
            <h2 className="modalHeader">Edit Chemical Information</h2>
            <form>
                <div className="inputModalContainer">
                    <label for="chemName">Chemical Name:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="chemName"
                        placeholder={capFirstLetter(chemName)}
                        onChange={(e) => setChemName(e.target.value)}
                    />
                    <label for="brand" className="modalRightLabel">
                        Brand Name:
                    </label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="brand"
                        placeholder={capFirstLetter(brand)}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <div>
                        <label for="casNum">CAS Number:</label>
                        <input
                            className="modalInputBox"
                            type="text"
                            name="casNum"
                            placeholder={casNum}
                            onChange={(e) => setCasNum(e.target.value)}
                        />
                        <label for="quantity" className="modalRightLabel">
                            Quantity Size:
                        </label>
                        <input
                            className="modalInputBox"
                            type="number"
                            name="quantity"
                            placeholder={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <select
                            // className="addChemInputDetails"
                            className="modalInputBox"
                            name="unit"
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <option>{unit}</option>
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
                <div className="inputModalContainer">
                    <label for="batchCode">Batch Code:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="batchCode"
                        placeholder={batchCode}
                        onChange={(e) => setBatchCode(e.target.value)}
                    />
                    <label for="supplier" className="modalRightLabel">
                        Supplier:
                    </label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="supplier"
                        placeholder={capFirstLetter(supplier)}
                        onChange={(e) => setSupplier(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <label htmlFor="mfgDate">Manufacturing Date:</label>
                    <input
                        className="modalInputBox"
                        type="date"
                        name="mfgDate"
                        value={new Date(mfgDate).toISOString().slice(0, 10)}
                        onChange={(e) => setMfgDate(e.target.value)}
                    />
                    <label htmlFor="expDate" className="expDate">
                        Expiry Date:
                    </label>
                    <input
                        className="modalInputBox"
                        type="date"
                        name="expDate"
                        value={new Date(expDate).toISOString().slice(0, 10)}
                        onChange={(e) => setExpDate(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <label for="localCode">Local Code:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="localCode"
                        placeholder={localCode}
                        onChange={(e) => setLocalCode(e.target.value)}
                    />
                    <label for="location" className="modalRightLabel">
                        Location:
                    </label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="location"
                        placeholder={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="inputModalContainer">
                    <label for="note">Note:</label>
                    <input
                        className="modalInputBox"
                        type="text"
                        name="note"
                        placeholder={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <div className="addButtonContainer">
                    <button
                        className="addButton"
                        onClick={() => handleClick(id)}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInfoModal;
