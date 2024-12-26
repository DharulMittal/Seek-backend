import User from "../models/user.js";

export const updateusername = async (req, res) => {
    try {
        const {username} = req.body;
        const userid = req.user._id;
        if (!username) {
            return res.status(400).json({msg: 'username is required'});
        }
        const updateduser = await User.findByIdAndUpdate(userid, {username: username}, {new: true});
        res.status(200).json({msg: 'username updated successfully', user: updateduser});
    } catch (error) {
        console.log(error);        
    }
};