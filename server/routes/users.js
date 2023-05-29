import express from "express";
import {
    getUser,
    getUserFollowing,
    followUser,
    unfollowUser,
    getUserByUsername
} from "../controllers/users.js"

import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

//read

router.get("/:username", verifyToken, getUserByUsername)
router.get("/:username/following", verifyToken, getUserFollowing);

// Follow a user
router.post('/:username/follow', followUser);

// Unfollow a user
router.post('/:username/unfollow', unfollowUser);

export default router;