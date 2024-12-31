import jwt from 'jsonwebtoken';

export const generateToken = (username, res) => {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    res.cookie('jwt', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure:true,
        sameSite: "None",
    });
    return token;
};