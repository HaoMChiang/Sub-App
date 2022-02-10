import express from "express";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("signup index");
});

app.listen(8080, () => {
  console.log(`Listening to port 8080`);
});
