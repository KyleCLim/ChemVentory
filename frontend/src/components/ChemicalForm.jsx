import React from "react";

const ChemicalForm = ({ chemicalData, handleChange, handleSubmit }) => {
    const units = [
        "μg",
        "mg",
        "g",
        "kg",
        "lbs",
        "oz",
        "μl",
        "mL",
        "L",
        "mmol",
        "units",
        "gal",
        "tank",
        "bottle",
    ];

    return (
        <form className="addChemForm">
            <h2 className="addChemHeader">ADD CHEMICAL TO INVENTORY</h2>
            <label htmlFor="chemName">Chemical Name:</label>
            <input
                type="text"
                name="chemName"
                placeholder="Enter Chemical Name"
                value={chemicalData.chemName}
                onChange={handleChange}
            />
            <label htmlFor="brand">Brand Name:</label>
            <input
                type="text"
                name="brand"
                placeholder="Enter Brand Name"
                value={chemicalData.brand}
                onChange={handleChange}
            />
            <label htmlFor="casNum">CAS Number:</label>
            <input
                type="text"
                name="casNum"
                placeholder="CAS Registry Number"
                value={chemicalData.casNum}
                onChange={handleChange}
            />
            <div className="inputContainer">
                <label htmlFor="quantity">Quantity Size:</label>
                <input
                    type="number"
                    name="quantity"
                    placeholder="Size of Container"
                    value={chemicalData.quantity}
                    onChange={handleChange}
                />
                <select
                    className="addChemInputDetails"
                    name="unit"
                    value={chemicalData.unit}
                    onChange={handleChange}
                >
                    {units.map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
            <label htmlFor="batchCode">Batch Code:</label>
            <input
                type="text"
                name="batchCode"
                placeholder="Batch Code"
                value={chemicalData.batchCode}
                onChange={handleChange}
            />
            <label htmlFor="location">Location:</label>
            <input
                type="text"
                name="location"
                placeholder="Storage Location"
                value={chemicalData.location}
                onChange={handleChange}
            />
            <label htmlFor="supplier">Supplier:</label>
            <input
                type="text"
                name="supplier"
                placeholder="Item Supplier"
                value={chemicalData.supplier}
                onChange={handleChange}
            />
            <div className="inputContainer">
                <label htmlFor="mfgDate">Manufacturing Date:</label>
                <input
                    type="date"
                    name="mfgDate"
                    value={chemicalData.mfgDate}
                    onChange={handleChange}
                />
                <label htmlFor="expDate" className="expDate">
                    Expiry Date:
                </label>
                <input
                    type="date"
                    name="expDate"
                    value={chemicalData.expDate}
                    onChange={handleChange}
                />
            </div>
            <label htmlFor="localCode">Local Code:</label>
            <input
                type="text"
                name="localCode"
                placeholder="Local Code"
                value={chemicalData.localCode}
                onChange={handleChange}
            />
            <label htmlFor="note">Note:</label>
            <input
                type="text"
                name="note"
                placeholder="Add Note"
                value={chemicalData.note}
                onChange={handleChange}
            />
            <div className="addButtonContainer">
                <button
                    type="button"
                    className="addButton"
                    onClick={handleSubmit}
                >
                    Add Chemical
                </button>
            </div>
        </form>
    );
};

export default ChemicalForm;
