import express from 'express';
import { signup } from '../controllers/authsignup.js';
import { login } from '../controllers/authlogin.js';
import { logout } from '../controllers/authlogout.js';
import { checkLogin } from '../middleware/checklogin.js';
import { update } from '../controllers/authupdate.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/login",login);

router.post("/signup",signup);

router.post("/logout", logout);

router.post("/update",checkLogin,update);

export default router;