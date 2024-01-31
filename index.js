import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

/*CONFIGURATION*/
dotenv.config();
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/*Default Route*/

app.get("/", (req, res) => {
  res.json({
    name: "TO DO API server",
    version: "1.0.0",
    description: "This is backend for chain tech assignment",
  });
});

/*API Routes*/

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

/*MongoDB Connection*/

const PORT = process.env.PORT || 80;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`bash App is running at Port ${PORT}`);
  });
});
