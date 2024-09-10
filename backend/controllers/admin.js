import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { format } from "date-fns";

export const getUserlist = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q =
            "SELECT user_id, fname, lname, username, email, department, employee_id, account_type.type AS type FROM users LEFT JOIN account_type ON users.accnt_type=account_type.id";

        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};

export const getTransactLog = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q =
            "SELECT transaction_id, transactions.item_id, transactions.type, transactions.quantity, transactions.unit, users.user_id, users.fname AS fname, users.lname AS lname, transactions.created_at, inventory_items.chem_name AS chem_name FROM transactions LEFT JOIN inventory_items ON transactions.item_id=inventory_items.item_id LEFT JOIN users ON transactions.user=users.user_id ORDER BY transactions.created_at DESC";

        db.query(q, (err, data) => {
            console.log(data);
            if (err) return res.send(err);
            return res.status(200).json(data);
        });
    });
};

export const deleteUser = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const { id } = req.params;

        const deleteUserQuery = "DELETE FROM users WHERE `user_id`=?";

        db.query(deleteUserQuery, [id], (err, data) => {
            console.log(data);
            console.log(err);
            if (err) return res.status(403).json(err);

            return res.json("User has been deleted from the list");
        });
    });
};

export const updateUser = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const { id } = req.params;

        const {
            fname,
            lname,
            username,
            email,
            accnt_type,
            department,
            employee_id,
        } = req.body;

        const q =
            "UPDATE users SET `fname`=?, `lname`=?, `username`=?, `email`=?, `accnt_type`=?, `department`=?, `employee_id`=?, `updated_at`=? WHERE `user_id`=?";
        const values = [
            fname,
            lname,
            username,
            email,
            accnt_type,
            department,
            employee_id,
            date,
            Number(id),
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User information has been updated.");
        });
    });
};

export const changePassword = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const { oldPassword, newPassword } = req.body;
        const { id } = req.params;

        try {
            // Fetch user's current password hash from the database
            db.query(
                "SELECT password FROM users WHERE user_id = ?",
                [id],
                async (err, results) => {
                    if (err) {
                        return res.json({ message: "Database error" });
                    }

                    const storedPasswordHash = results[0].password;

                    // Compare old password with the stored password
                    const isMatch = await bcrypt.compare(
                        oldPassword,
                        storedPasswordHash
                    );

                    if (!isMatch) {
                        return res
                            .status(400)
                            .json({ message: "Password does not match" });
                    }

                    // Encrypt the new password
                    const salt = await bcrypt.genSalt(10);
                    const newHashedPassword = await bcrypt.hash(
                        newPassword,
                        salt
                    );

                    console.log("old password:", oldPassword);
                    console.log("new password:", newPassword);
                    console.log("stored hash password:", storedPasswordHash);
                    console.log("compare result", isMatch);

                    // Update password in the database
                    db.query(
                        "UPDATE users SET password = ? WHERE user_id = ?",
                        [newHashedPassword, id],
                        (err, result) => {
                            if (err) {
                                return res.json({ message: "Database error" });
                            }
                            res.json({
                                success: true,
                                message: "Password updated successfully",
                            });
                        }
                    );
                }
            );
        } catch (err) {
            console.error("Error updating password:", err);
            res.status(500).json({
                message: "An error occurred while updating the password",
            });
        }
    });
};
