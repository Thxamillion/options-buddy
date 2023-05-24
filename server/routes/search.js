import express from "express";
import {
    search
} from "../controllers/search.js"



const router = express.Router()

//read

router.get("/search", search)
 export default router