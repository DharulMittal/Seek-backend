import { generateToken } from "../lib/util.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

function passcheck(password) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (password.match(passw)) {
        return true;
    } else {
        return false;
    }
}

export const signup = async (req, res) => {
    const { username,email, password } = req.body;
    const user = await User.findOne({email: email});
    try {
        if (!username || !email || !password) {
            return res.status(400).json({msg: 'All fields are required'});
        }
        else if (!passcheck(password)) {
            return res.status(400).json({msg: 'Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'});
        }
        else if (user){
            return res.status(400).json({msg: 'User already exists'});
        }
        else {
            const salt  = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username : username,
                email : email,
                password: hashedPassword,
            });

            if (newUser) {
                generateToken(newUser._id, res);
                await newUser.save();
                res.status(200).json({msg: 'Login Successful'});
            }
            else {
                return res.status(400).json({msg: 'User not created'});
            }

        }
    } catch (error) {
        console.log(error);   
    }
};
