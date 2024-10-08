import { db } from "../db.js";
import bcrypt from "bcryptjs";
import { format } from "date-fns";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    let date = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // Check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) return res.status(409).json("User already exist!");

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //Post user info to database
        const q =
            "INSERT INTO users (`fname`, `lname`, `username`, `email`, `password`, `accnt_type`, `department`, `employee_id`, `created_at`, `updated_at`) VALUES (?)";
        const values = [
            req.body.fName,
            req.body.lName,
            req.body.username,
            req.body.email,
            hash,
            req.body.accntType,
            req.body.department,
            req.body.employeeID,
            date,
            date,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("You are successfully registered");
        });
    });
};

export const login = (req, res) => {
    // Check user
    // const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    const q = "SELECT * FROM users WHERE username = ?";
    // db.query(q, [req.body.email, req.body.username], (err, data) => {
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check/compare password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) return res.status(400).json("Wrong password!");

        const token = jwt.sign(
            { id: data[0].user_id, facility: data[0].department },
            "jwtkey"
        );

        const { password, ...other } = data[0];
        console.log("You're successfully logged in");
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json("User has been logged out.");
};
