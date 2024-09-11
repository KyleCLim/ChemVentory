import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAlert } from "../context/AlertContext";
import { deleteUser } from "../api/apiService";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "25%",
    bgcolor: "background.paper",
    border: "5px solid #BCA9C0",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const DeleteUserModal = ({ id, account, setUserList }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showAlert = useAlert();

    const handleDeleteItem = async (id) => {
        try {
            await deleteUser(id);
            showAlert("User has been deleted from the list", "warning");
            setUserList((prevItems) =>
                prevItems.filter((user) => user.user_id !== id)
            );
            handleClose();
        } catch (err) {
            console.log(err);
            showAlert(err, "error");
        }
    };

    return (
        <div>
            <button className="actionIcons" onClick={handleOpen}>
                <box-icon name="trash" color="rgb(203, 112, 112)" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="deleteModalBox">
                    <h4>
                        Are you sure you want to delete account{" "}
                        <span className="italicizedWord">{account}</span> in
                        your list?
                    </h4>
                    <div className="deleteModalButnsContainer">
                        <button
                            className="modalCancelBtn"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="modalYesBtn"
                            onClick={() => handleDeleteItem(id)}
                        >
                            Yes
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default DeleteUserModal;
