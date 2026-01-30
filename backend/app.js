import apiRoutes from "./routes/index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Mở CORS cho Frontend gọi API
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Kết nối thành công với Blockchain Sepolia qua Contract`);
});
