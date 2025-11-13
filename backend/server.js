import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables (if you have a .env file)
dotenv.config();

//app config
const app = express();
const PORT = process.env.PORT || 4000; //For production or scalable apps --- You mustn't edit code if you ever change port or deploy

//middleware

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// run Express server
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
