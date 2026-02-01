import statsRoutes from "./v1/statsRoute.js";
import authRoutes from "./v1/authRoute.js";
import { Router } from "express";

const router = Router();
router.use("/v1", statsRoutes);
router.use("/v1", authRoutes);
export default router;
