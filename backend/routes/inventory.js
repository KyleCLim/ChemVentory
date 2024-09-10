import express from "express";
import {
    getInvPerCont,
    getInvSummary,
    getWatchlist,
    addToWatchlist,
    updateChem,
} from "../controllers/inventory.js";

const router = express.Router();

router.get("/inv-per-container", getInvPerCont);
router.get("/inv-summary", getInvSummary);
router.get("/inv-watchlist", getWatchlist);
router.put("/add-watchlist/:id", addToWatchlist);
router.put("/update-chem/:id", updateChem);

export default router;
