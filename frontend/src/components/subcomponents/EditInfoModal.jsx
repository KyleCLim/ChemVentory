import React, { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import EditChemicalForm from "../EditChemicalForm";
import { updateChemical } from "../../api/apiService";

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
    const [chemicalData, setChemicalData] = useState({
        chemName: name,
        brand: chemBrand,
        casNum: cas,
        quantity: qty,
        unit: unitQty,
        batchCode: batch,
        location: chemLoc,
        supplier: chemSup,
        mfgDate: mfg,
        expDate: exp,
        localCode: chemLocalCode,
        note: chemNote,
    });

    const showAlert = useAlert();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setChemicalData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateChemical(id, chemicalData);
            showAlert("Successfully updated item in inventory", "info");
        } catch (err) {
            console.error(err);
            showAlert("Failed to update item", "error");
        }
    };

    return (
        <div className="chemInfoModalContainer">
            <h2 className="modalHeader">Edit Chemical Information</h2>
            <EditChemicalForm
                chemicalData={chemicalData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default EditInfoModal;
