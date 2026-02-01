import express from "express";
import { getStats, handleLike } from "../../controllers/statsController.js";
import { protect } from "../../middlewares/authMiddlewares.js";
export const Router = express.Router();
Router.get("/stats/:contractAddress", getStats);
Router.post("/stats/like", protect, handleLike);
export default Router;
