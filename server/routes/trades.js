import express from "express";
import {getFeedTrades, getUserTrades} from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();


//read
router.get("/", getFeedTrades)
router.get("/:userId/trades", getUserTrades)


// update


export default router;