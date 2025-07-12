import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";
import userRoute from "./routes/userRoute.js";
import issueRoute from "./routes/issueRoute.js";
import adminRoute from "./routes/adminRoute.js";
import path from "path";
dotenv.config();
const app = express();

//middlewares
app.use(cors({ origin: "*" }{ origin: "https://j0dh4nn5-5173.inc1.devtunnels.ms/" }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//Db connection
connectDB();

//Root endpoint
app.get("/", (req, res) => {
  res.send("Api is working...");
});

//sub-routes
app.use("/api/auth/", userRoute);
app.use("/api/issue/", issueRoute);
app.use("/api/admin", adminRoute); //adminLogin
app.use("/api/admin", issueRoute); //admin delete and update

//server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
