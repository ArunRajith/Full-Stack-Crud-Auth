import { User } from "../models/usermodels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this username or email. Please try with a different one.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken(newUser);

        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User email not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

export const getUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to get user",
        });
    }
};

