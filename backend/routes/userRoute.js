import express from "express";
import { getAllUsers, getUserById } from "../controllers/UserController.js";

const router = express.Router();


router.get("/", getAllUsers);         // GET all users
router.get("/:id", getUserById);      // GET user by ID

export default router;
