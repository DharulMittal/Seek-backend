import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({msg: 'Unauthorized'});
        }

        const user = await User.findOne({_id: decode.username}).select('-password');
    
        if(!user){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);        
    }
};