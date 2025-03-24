import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function() {
                // Password is required only if googleId is not provided
                return !this.googleId;
            },
            minlegth: 6,
        },
        pfp: {
            type: String,
            // required: true,
            default: "",
        },
        googleId: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: "offline",
        },
    },
    {
        timestamps: true,
    }   
);

const User = mongoose.model("User", userSchema);

export default User;