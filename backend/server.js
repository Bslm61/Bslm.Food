import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables (if you have a .env file)
dotenv.config();

//app config
const app = express();
const PORT = process.env.PORT || 4000; //For production or scalable apps --- You mustn't edit code if you ever change port or deploy

//middleware

app.use(express.json());
app.use(cors());

// db connection
connectDB();

//APi endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api.order",orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// run Express server
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});

//mongodb+srv://FoodDel:14112025DB@cluster0.wq3hb5k.mongodb.net/?
