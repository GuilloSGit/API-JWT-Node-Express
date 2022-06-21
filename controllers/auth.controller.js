import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        /* Validation alternative searching for email in database */
        let user = await User.findOne({ email: email });
        if (user) {
            throw ({ code : 11000 });
        }
        
        user = new User({
            email: email,
            password: password
        });

        await user.save();

        /* jwt token */
        
        return res.status(201).json({ "ok": "successfully registered" });
        
    } catch (error) {
        console.log(error);
        /* Default mongoose alternative */
        if (error.code === 11000) {
            return res.status(400).json({ "error": "Email already exists" });
        }
        return res.status(500).json({ "error": "Something went wrong trying to save the user" });
    }
};

export const login = async (req, res) => {
    try {
        /* Corroboration with email */
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({ "error": "User not found" });
        }

        /* Corroboration with password */
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(403).json({ "error": "Wrong password" });
        }

        // JWT Generation with user id and 15 minutes expiration
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });

        return res.json({token});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": "Something went wrong trying to login" });
    }
};
