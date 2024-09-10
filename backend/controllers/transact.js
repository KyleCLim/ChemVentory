import { db } from "../db.js";
import { format } from "date-fns";
import jwt from "jsonwebtoken";

export const addChem = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const addChemTransaction = async () => {
            try {
                const insertInvQuery =
                    "INSERT INTO inventory_items (`chem_name`, `brand`, `cas_num`, `quantity`, `unit`, `batch_code`, `location`, `supplier`, `local_code`, `note`, `isfavorite`, `user_id`, `facility_id`, `mfg_date`, `exp_date`, `created_at`, `updated_at`) VALUES(?)";
                const insertInvValues = [
                    req.body.chemName.toLowerCase(),
                    req.body.brand.toLowerCase(),
                    req.body.casNum,
                    req.body.quantity,
                    req.body.unit,
                    req.body.batchCode,
                    req.body.location,
                    req.body.supplier.toLowerCase(),
                    req.body.localCode,
                    req.body.note,
                    0,
                    userInfo.id,
                    userInfo.facility,
                    req.body.mfgDate,
                    req.body.expDate,
                    date,
                    date,
                ];

                // Wrapping db.query in a promise
                const insertItem = () => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            insertInvQuery,
                            [insertInvValues],
                            (err, data) => {
                                if (err) return reject(err);
                                resolve(data.insertId);
                            }
                        );
                    });
                };

                let itemId = await insertItem();

                const insertTransQuery =
                    "INSERT INTO transactions (`item_id`, `type`, `user`, `quantity`, `unit`, `created_at`) VALUES(?, ?, ?, ?, ?, ?)";
                const insertTransValues = [
                    itemId,
                    "Addition",
                    userInfo.id,
                    req.body.quantity,
                    req.body.unit,
                    date,
                ];

                // Wrapping db.query in a promise
                const insertTransaction = () => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            insertTransQuery,
                            insertTransValues,
                            (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            }
                        );
                    });
                };

                await insertTransaction();
                res.status(200).json(
                    "Item and transaction have been added successfully"
                );
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        };

        addChemTransaction();
    });
};

export const deleteChem = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const { chemId } = req.params;

        const deleteChemQuery = "DELETE FROM inventory_items WHERE `item_id`=?";

        db.query(deleteChemQuery, [chemId], (err, data) => {
            console.log(data);
            console.log(err);
            if (err) return res.status(403).json(err);

            return res.json("Item has been deleted from your inventory");
        });
    });
};

export const useChem = async (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const addChemTransaction = async () => {
            try {
                const { chemId } = req.params;
                const { usageQty, initialQty } = req.body;
                const newQty = parseFloat(initialQty) - parseFloat(usageQty);
                const unit = req.body.unit;

                if (newQty < 0) {
                    return res.json("Usage quantity exceeds stock quantity");
                }

                const q =
                    "UPDATE inventory_items SET `quantity`=?, `updated_at`=? WHERE `item_id`=?";
                const values = [newQty, date, chemId];

                const updateItem = () => {
                    return new Promise((resolve, reject) => {
                        db.query(q, values, (err, data) => {
                            if (err) return reject(err);
                            resolve(data);
                        });
                    });
                };

                await updateItem();

                const insertTransQuery =
                    "INSERT INTO transactions (`item_id`, `type`, `user`, `quantity`, `unit`, `created_at`) VALUES(?, ?, ?, ?, ?, ?)";
                const insertTransValues = [
                    chemId,
                    "Usage",
                    userInfo.id,
                    usageQty,
                    unit,
                    date,
                ];

                // Wrapping db.query in a promise
                const insertTransaction = () => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            insertTransQuery,
                            insertTransValues,
                            (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            }
                        );
                    });
                };
                await insertTransaction();
                res.status(200).json("Chemical usage recorded successfully");

                // console.log(itemId);
            } catch (err) {
                console.log(err);
            }
        };

        addChemTransaction();
    });
};

export const addQty = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const addChemTransaction = async () => {
            try {
                const { chemId } = req.params;
                const { usageQty, initialQty } = req.body;
                const newQty = parseFloat(initialQty) + parseFloat(usageQty);
                const unit = req.body.unit;

                if (newQty < 0) {
                    return res.json("Usage quantity exceeds stock quantity");
                }

                const q =
                    "UPDATE inventory_items SET `quantity`=?, `updated_at`=? WHERE `item_id`=?";
                const values = [newQty, date, chemId];

                console.log("I'm here");

                const updateItem = () => {
                    return new Promise((resolve, reject) => {
                        db.query(q, values, (err, data) => {
                            if (err) return reject(err);
                            resolve(data);
                        });
                    });
                };

                console.log("Pass the update query");

                await updateItem();

                console.log("Successful update query");

                const insertTransQuery =
                    "INSERT INTO transactions (`item_id`, `type`, `user`, `quantity`, `unit`, `created_at`) VALUES(?, ?, ?, ?, ?, ?)";
                const insertTransValues = [
                    chemId,
                    "Addition",
                    userInfo.id,
                    usageQty,
                    unit,
                    date,
                ];

                // Wrapping db.query in a promise
                const insertTransaction = () => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            insertTransQuery,
                            insertTransValues,
                            (err, result) => {
                                if (err) return reject(err);
                                resolve(result);
                            }
                        );
                    });
                };
                await insertTransaction();
                res.status(200).json("Chemical usage recorded successfully");

                // console.log(itemId);
            } catch (err) {
                console.log(err);
            }
        };

        addChemTransaction();
    });
};

export const getTransactHistory = (req, res) => {
    const token = req.cookies.access_token;
    // console.log(token);

    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const { id } = req.params;
        const q =
            "SELECT transactions.type, users.fname, users.lname, transactions.quantity, transactions.unit, transactions.created_at FROM transactions LEFT JOIN users ON transactions.user=users.user_id WHERE item_id = ? ORDER BY created_at ASC";
        const value = id;

        db.query(q, [value], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};
