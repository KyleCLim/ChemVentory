import express from "express";
import {
    getUserlist,
    getTransactLog,
    deleteUser,
    updateUser,
    changePassword,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/admin-userlist", getUserlist);
router.get("/admin-trasactionlog", getTransactLog);
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user/:id", updateUser);
router.put("/change-password/:id", changePassword);
export default router;
