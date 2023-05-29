import express from "express";
import { getFeedTrades, getUserTrades, createTrade, getTradeById, editTrade } from "../controllers/trades.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/", getFeedTrades)
router.get("/:userId", getUserTrades)
router.get("/:username/:tradeId", getTradeById);

// post
router.post("/", verifyToken, createTrade)

//put 
router.put("/:username/:tradeId", verifyToken, editTrade);

export default router;
