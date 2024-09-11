import React, { useState } from "react";
import { useAlert } from "../context/AlertContext";
import ChemicalForm from "./ChemicalForm";
import { addChemicalToInventory } from "../api/apiService";

const AddChemical = () => {
    const [chemicalData, setChemicalData] = useState({
        chemName: "",
        brand: "",
        casNum: "",
        quantity: 0,
        unit: "",
        batchCode: "",
        location: "",
        supplier: "",
        mfgDate: "",
        expDate: "",
        localCode: "",
        note: "",
    });

    const showAlert = useAlert();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChemicalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await addChemicalToInventory(chemicalData);
            showAlert("Item added to inventory successfully", "info");
        } catch (err) {
            console.log(err);
            showAlert("Error adding item to inventory", "error");
        }
    };

    return (
        <div className="addChemContainer">
            <ChemicalForm
                chemicalData={chemicalData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddChemical;
