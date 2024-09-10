import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";
import EditInfoModal from "./subcomponents/EditInfoModal";
import DownloadInfoModal from "./subcomponents/DownloadInfoModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "55%",
    height: "80%",
    bgcolor: "background.paper",
    border: "5px solid #BCA9C0",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const EditModal = ({
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
                <Box sx={style} className="modalBox">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Edit Information" value="1" />
                                <Tab
                                    label="Download Transaction History"
                                    value="2"
                                />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <EditInfoModal
                                id={id}
                                name={name}
                                chemBrand={chemBrand}
                                cas={cas}
                                qty={qty}
                                unitQty={unitQty}
                                batch={batch}
                                chemLoc={chemLoc}
                                chemSup={chemSup}
                                chemLocalCode={chemLocalCode}
                                chemNote={chemNote}
                                mfg={mfg}
                                exp={exp}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <DownloadInfoModal
                                id={id}
                                name={name}
                                chemBrand={chemBrand}
                                batch={batch}
                                chemSup={chemSup}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;
