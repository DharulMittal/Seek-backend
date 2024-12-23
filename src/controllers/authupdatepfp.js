import User from "../models/user.js";
import claudinary from "../lib/claudinary.js";

export const updatepfp = async (req, res) => {
    try {
        const {pfp} = req.body;
        const userid = req.user._id;
        if (!pfp) {
            return res.status(400).json({msg: 'PFP is required'});
        }
        const response = await claudinary.uploader.upload(pfp);
        const updateduser = await User.findByIdAndUpdate(userid, {pfp: response.secure_url}, {new: true});
        res.status(200).json({msg: 'PFP updated successfully', user: updateduser});
    } catch (error) {
        console.log(error);        
    }
};