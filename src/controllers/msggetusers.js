export const getusers = async (req, res) => {
    try {
        const userid = req.user._id;
        const filteredusers = await User.find({_id: {$ne: userid}}).select('-password');
        res.status(200).json(filteredusers);
    } catch (error) {
        console.log(error);        
    }
};