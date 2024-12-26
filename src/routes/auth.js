import express from 'express';
import { signup } from '../controllers/authsignup.js';
import { login } from '../controllers/authlogin.js';
import { logout } from '../controllers/authlogout.js';
import { checkLogin } from '../middleware/checklogin.js';
import { updatepfp } from '../controllers/authupdatepfp.js';
import { updateusername } from '../controllers/authupdateuname.js';

const router = express.Router();

router.get("/", (req, res) => {
    // res.send("Hello World");
    res.json({
        "_id": "676859e074c030382d4ccad9",
        "username": "Dharul",
        "email": "Ishika@gmail.com",
        "pfp": "",
        "createdAt": "2024-12-22T18:26:40.174Z",
        "updatedAt": "2024-12-22T18:26:40.174Z",
        "__v": 0
    });
});

router.post("/login",login);

router.post("/signup",signup);

router.post("/logout", logout);

router.put("/updatepfp",checkLogin,updatepfp);

router.put("/updateuname",checkLogin,updateusername)

router.get("/check",checkLogin, (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
});
export default router;