import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";
import UpdateUserInfo from "./subcomponents/UpdateUserInfo";
import ChangeUserPassword from "./subcomponents/ChangeUserPassword";
// import { useAlert } from "../context/AlertContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "auto",
    bgcolor: "background.paper",
    border: "5px solid #BCA9C0",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const UpdateUserModal = ({
    fName,
    lName,
    userName,
    Email,
    Password,
    type,
    Department,
    employee_Id,
    id,
}) => {
    // const showAlert = useAlert();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <button className="actionIcons" onClick={handleOpen}>
                <box-icon name="pencil" color="rgb(213, 165, 46)" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modalBox updateUserBox">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Update Information" value="1" />
                                <Tab label="Change Password" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <UpdateUserInfo
                                fName={fName}
                                lName={lName}
                                userName={userName}
                                Email={Email}
                                type={type}
                                Department={Department}
                                employee_Id={employee_Id}
                                handleClose={handleClose}
                                id={id}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <ChangeUserPassword
                                id={id}
                                handleClose={handleClose}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateUserModal;
