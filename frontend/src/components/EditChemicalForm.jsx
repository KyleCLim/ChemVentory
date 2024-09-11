import React from "react";
import { capFirstLetter } from "../utils/helpers";

const EditChemicalForm = ({ chemicalData, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="inputModalContainer">
                <label htmlFor="chemName">Chemical Name:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="chemName"
                    value={capFirstLetter(chemicalData.chemName)}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="brand" className="modalRightLabel">
                    Brand Name:
                </label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="brand"
                    value={capFirstLetter(chemicalData.brand)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="casNum">CAS Number:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="casNum"
                    value={chemicalData.casNum}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="quantity" className="modalRightLabel">
                    Quantity Size:
                </label>
                <input
                    className="modalInputBox"
                    type="number"
                    name="quantity"
                    value={chemicalData.quantity}
                    onChange={handleChange}
                    required
                />
                <select
                    className="modalInputBox"
                    name="unit"
                    value={chemicalData.unit}
                    onChange={handleChange}
                    required
                >
                    <option disabled value="">
                        Select Unit
                    </option>
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
            <div className="inputModalContainer">
                <label htmlFor="batchCode">Batch Code:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="batchCode"
                    value={chemicalData.batchCode}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="supplier" className="modalRightLabel">
                    Supplier:
                </label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="supplier"
                    value={capFirstLetter(chemicalData.supplier)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="mfgDate">Manufacturing Date:</label>
                <input
                    className="modalInputBox"
                    type="date"
                    name="mfgDate"
                    value={new Date(chemicalData.mfgDate)
                        .toISOString()
                        .slice(0, 10)}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="expDate" className="modalRightLabel">
                    Expiry Date:
                </label>
                <input
                    className="modalInputBox"
                    type="date"
                    name="expDate"
                    value={new Date(chemicalData.expDate)
                        .toISOString()
                        .slice(0, 10)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="localCode">Local Code:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="localCode"
                    value={chemicalData.localCode}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="location" className="modalRightLabel">
                    Location:
                </label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="location"
                    value={chemicalData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="inputModalContainer">
                <label htmlFor="note">Note:</label>
                <input
                    className="modalInputBox"
                    type="text"
                    name="note"
                    value={chemicalData.note}
                    onChange={handleChange}
                />
            </div>
            <div className="addButtonContainer">
                <button onClick={handleSubmit} className="addButton">
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditChemicalForm;
