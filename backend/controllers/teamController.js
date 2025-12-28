import Team from "../models/Team.js";
import User from "../models/User.js";

/**
 * @desc    Create new maintenance team
 * @route   POST /api/teams
 * @access  Admin / Manager
 */
export const createTeam = async (req, res) => {
    try {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Team name is required"
            });
        }

        const teamExists = await Team.findOne({ name });
        if (teamExists) {
            return res.status(400).json({
                success: false,
                message: "Team already exists"
            });
        }

        const team = await Team.create({ name });

        res.status(201).json({
            success: true,
            team
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Get all teams
 * @route   GET /api/teams
 * @access  Protected (any logged-in user)
 */
export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find()
            .populate("members", "name email role");

        res.status(200).json({
            success: true,
            teams
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * @desc    Get single team by ID
 * @route   GET /api/teams/:teamId
 * @access  Protected (any logged-in user)
 */
export const getTeamById = async (req, res) => {
    try {
        const { teamId } = req.params;

        const team = await Team.findById(teamId)
            .populate("members", "name email role teamId");

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        res.status(200).json({
            success: true,
            team
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * @desc    Add technician to team
 * @route   PATCH /api/teams/:teamId/add-member
 * @access  Admin / Manager
 */
export const addTechnicianToTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { technicianId } = req.body;
console.log(req.user.role);
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const technician = await User.findById(technicianId);
        if (!technician) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (technician.role !== "technician") {
            return res.status(400).json({
                success: false,
                message: "Only technicians can be added to teams"
            });
        }

        // Assign team to technician
        technician.teamId = teamId;
        await technician.save();

        // Add technician to team members
        if (!team.members.includes(technician._id)) {
            team.members.push(technician._id);
            await team.save();
        }

        res.status(200).json({
            success: true,
            message: "Technician added to team successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
