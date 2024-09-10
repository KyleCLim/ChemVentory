import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success", // success, error, warning, info
    });

    const showAlert = (message, severity = "success") => {
        setAlert({ open: true, message, severity });
    };

    const closeAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={closeAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    onClose={closeAlert}
                    severity={alert.severity}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
