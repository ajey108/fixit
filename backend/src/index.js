import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//Db connection
connectDB();

//Root endpoint
app.get("/", (req, res) => {
  res.send("Api is working...");
});

//sub-routes

//server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
