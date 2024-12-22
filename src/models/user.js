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
            required: true,
            minlegth: 6,
        },
        pfp: {
            type: String,
            // required: true,
            default: "",
        }
    },
    {
        timestamps: true,
    }   
);

const User = mongoose.model("User", userSchema);

export default User;