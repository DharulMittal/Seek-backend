import User from "../models/user.js";
import { generateToken } from "../lib/util.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {  
        if (!email || !password) {
            return res.status(400).json({msg: 'All fields are required'});
        }
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({msg: 'Incorrect credentials'});
        }
        else{
            const ispassword = await bcrypt.compare(password, user.password);
            if(ispassword){                
                generateToken(user._id, res);
                res.status(200).json({msg: 'Login Successful'});
            }
            else{
                return res.status(400).json({msg: 'Incorrect credentials'});
            }
        }
        
    } catch (error) {
        console.log(error);        
    }
};