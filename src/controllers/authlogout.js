export const logout = async (req, res) => {
    try {
        // Clear the JWT cookie with proper options
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        
        res.status(200).json({ msg: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
    }
};