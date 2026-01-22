import express from "express";
import { connectDb } from "./config/Dbconfig.js";
import productRoutes from "./routes/productRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

import LoginRoutes from "./routes/LoginRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome ");
});

app.use("/products", productRoutes);

app.use("/login", LoginRoutes);

app.use("/admins", AdminRoutes);

app.use("/customers", CustomerRoutes);
app.use("/cart", cartRoutes);
app.use("/category", CategoryRoutes);

app.use("/orders", OrderRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT - ${PORT}`);
  connectDb();
});
