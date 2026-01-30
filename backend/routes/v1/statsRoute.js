import express from "express";
import { getStats, handleLike } from "../../controllers/statsController.js";
export const Router = express.Router();
Router.get("/stats/:contractAddress", getStats);
Router.post("/stats/like", handleLike);
export default Router;
