import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import productRoutes from "./routes/productRouter.js";
dotenv.config();
const app = express();

connectDb();
app.use(express.json());

// cors middleware
app.use(cors());
app.get("/", (req, res) => {
  res.send("server is running ");
});
// authentication routs
app.use("/api/auth", authRoutes);
// category routes
app.use("/api/category", categoryRoutes);
// app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
