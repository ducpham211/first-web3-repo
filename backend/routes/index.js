import statsRoutes from "./v1/statsRoute.js";
import { Router } from "express";

const router = Router();
router.use("/v1", statsRoutes);

export default router;
