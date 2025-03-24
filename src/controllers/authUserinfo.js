import User from "../models/user.js";

export const getUSerinfo = async (req, res) => {
    const { id } = req.body;
    try {  
        const user = await User.findOne({_id: id}).select('-password');
        if (!user) {
            return res.status(400).json({msg: 'User not found'});
        }        
        else{
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);        
    }
};