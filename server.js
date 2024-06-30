import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import paymentRoute from "./Routes/paymentRoute.js";
import orderRoute from "./Routes/orderRoute.js";
dotenv.config();

//databaseConfig
connectDB();

const app = express();
const PORT = process.env.PORT || 8020;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/api/v1/orders", orderRoute);

app.get("/api/get-key", (req, res) => {
  res.status(200).send({ key: process.env.ROZAR_PAY_KEY_ID });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is Running at http://localhost:${PORT}`.bold)

});
