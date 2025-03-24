import express from 'express';
import { signup } from '../controllers/authsignup.js';
import { login } from '../controllers/authlogin.js';
import { logout } from '../controllers/authlogout.js';
import { checkLogin } from '../middleware/checkLogin.js';
import { updatepfp } from '../controllers/authupdatepfp.js';
import { updateusername } from '../controllers/authupdateuname.js';
import { googleAuthCallback, googleAuthFailure } from '../controllers/authGoogle.js';
import passport from '../config/passport.js';
import { getUSerinfo } from '../controllers/authUserinfo.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/login",login);

router.post("/signup",signup);

router.post("/logout", logout);

router.put("/updatepfp",checkLogin,updatepfp);

router.put("/updateuname",checkLogin,updateusername)

// Google OAuth routes
router.get('/google', 
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/api/auth/google/failure',
        session: false 
    }),
    googleAuthCallback
);

router.get('/google/failure', googleAuthFailure);

router.post('/userinfo',checkLogin, getUSerinfo);

router.get("/check",checkLogin, (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
});
export default router;