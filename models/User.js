import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    }
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Hashing failed");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return await bcrypt.compare(candidatePassword, user.password);
}

export const User = mongoose.model("User", userSchema);