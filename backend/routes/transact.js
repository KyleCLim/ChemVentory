import express from "express";
import {
    addChem,
    deleteChem,
    useChem,
    addQty,
    getTransactHistory,
} from "../controllers/transact.js";

const router = express.Router();

router.post("/add-chem", addChem);
router.delete("/:chemId", deleteChem);
router.put("/use-chem/:chemId", useChem);
router.put("/add-qty/:chemId", addQty);
router.get("/transaction-history/:id", getTransactHistory);

export default router;
