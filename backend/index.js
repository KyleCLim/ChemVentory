import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import transactRoutes from "./routes/transact.js";
import inventoryRoutes from "./routes/inventory.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

/////////////////---GENERAL ROUTES---//////////////////////
app.use("/api/auth", authRoutes);
app.use("/api/transacts", transactRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);

app.listen(8800, () => {
    console.log("Connected to server!");
});
