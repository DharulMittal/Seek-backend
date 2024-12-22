export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({msg: 'Logged out successfully'});
        
    } catch (error) {
        console.log(error);
    }
};