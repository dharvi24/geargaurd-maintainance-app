import express from "express";
import {
    createTeam,
    getAllTeams,
    addTechnicianToTeam,
    getTeamById
} from "../controllers/teamController.js";

import { authMiddleware, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Create team (Admin / Manager)
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    createTeam
);
router.get("/:teamId", authMiddleware, getTeamById);

// Get all teams (Any logged-in user)
router.get(
    "/",
    authMiddleware,
    getAllTeams
);

// Add technician to team (Admin / Manager)
router.patch(
    "/:teamId/add-member",
    authMiddleware,
    authorizeRoles("admin", "manager"),
    addTechnicianToTeam
);

export default router;
