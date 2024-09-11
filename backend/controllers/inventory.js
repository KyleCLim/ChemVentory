import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { format } from "date-fns";

export const getInvPerCont = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q =
            "SELECT * FROM inventory_items WHERE facility_id = ? ORDER BY chem_name ASC";
        const value = userInfo.facility;

        db.query(q, [value], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};

export const getInvSummary = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q =
            "SELECT chem_name, cas_num, local_code, SUM(quantity) AS total_quantity, unit, MIN(exp_date) AS nearest_expiry_date, MIN(mfg_date) AS oldest_mfg_date FROM inventory_items WHERE facility_id = ? GROUP BY chem_name, cas_num, local_code, unit";
        const value = userInfo.facility;

        db.query(q, [value], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};

export const getWatchlist = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q =
            "SELECT * FROM inventory_items WHERE isfavorite = 1 AND facility_id = ? ORDER BY chem_name ASC";
        const value = userInfo.facility;

        db.query(q, [value], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};

export const addToWatchlist = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const { id } = req.params;

        const q =
            "UPDATE inventory_items SET `isfavorite`=?, `updated_at`=? WHERE `item_id`=?";
        const values = [req.body.isfavorite ? 1 : 0, date, id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Item has been added to watchlist.");
        });
    });
};

export const updateChem = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const { id } = req.params;
        const {
            chemName,
            brand,
            casNum,
            quantity,
            unit,
            batchCode,
            location,
            supplier,
            localCode,
            note,
            mfgDate,
            expDate,
        } = req.body;
        const newMfgDate = format(new Date(mfgDate), "yyyy-MM-dd HH:mm:ss");
        const newExpDate = format(new Date(expDate), "yyyy-MM-dd HH:mm:ss");
        const q =
            "UPDATE inventory_items SET `chem_name`=?, `brand`=?, `cas_num`=?, `quantity`=?, `unit`=?, `batch_code`=?, `location`=?, `supplier`=?, `local_code`=?, `note`=?, `mfg_date`=?, `exp_date`=?, `updated_at`=? WHERE `item_id`=?";
        const values = [
            chemName.toLowerCase(),
            brand.toLowerCase(),
            casNum,
            quantity,
            unit,
            batchCode,
            location,
            supplier.toLowerCase(),
            localCode,
            note,
            newMfgDate,
            newExpDate,
            date,
            Number(id),
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Item has been added to watchlist.");
        });
    });
};
