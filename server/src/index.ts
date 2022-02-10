import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to Database");

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use("/auth", authRoutes);

    app.get("/", (req, res) => {
      res.json("signup index");
    });

    app.listen(8080, () => {
      console.log(`Listening to port 8080`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
    throw new Error(error);
  });
