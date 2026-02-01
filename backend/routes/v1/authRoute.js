import express from "express";
import { getNonce, verifySignature } from "../../controllers/authController.js";

const router = express.Router();

router.post("/auth/nonce", getNonce);
router.post("/auth/verify", verifySignature);

export default router;
