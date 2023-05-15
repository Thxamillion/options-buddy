import express from "express";
import {
    getUser,
    getUserFollowing,
    followUser,
    unfollowUser
} from "../controllers/users.js"

import { verifyToken } from "../middleware/auth.js";

const router = express.Router()

//read

router.get("/:id", verifyToken, getUser)
router.get("/:id/following", verifyToken, getUserFollowing);

// Follow a user
router.post('/:id/follow', followUser);

// Unfollow a user
router.post('/:id/unfollow', unfollowUser);

export default router;