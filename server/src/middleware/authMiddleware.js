import jwt from "jsonwebtoken";
import { User } from "../models/usermodels.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            return next();
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
};
