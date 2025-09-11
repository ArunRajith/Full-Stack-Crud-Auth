import { Goal } from "../models/goalModel.js";
import { User } from "../models/usermodels.js";

export const createGoal = async (req, res) => {
    try {
        const goal = new Goal({ ...req.body, user: req.user.id });
        await goal.save();

        res.status(201).json({
            success: true,
            message: "Goal created successfully",
            data: goal
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to create goal"
        });
    }
};

export const getGoal = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: "Goals fetched successfully",
            data: goals
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to get goals"
        });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User not authorized"
            });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Goal updated successfully",
            data: updatedGoal
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update goal"
        });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found"
            });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User not authorized"
            });
        }

        await goal.deleteOne();

        res.status(200).json({
            success: true,
            message: "Goal deleted successfully",
            data: goal
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to delete goal"
        });
    }
};
