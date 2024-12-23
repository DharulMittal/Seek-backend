import express from 'express';
import { checkLogin } from '../middleware/checklogin.js';
import { getusers } from '../controllers/msggetusers.js';
import { getmsg } from '../controllers/msggetmsg.js';
import { sendmsg } from '../controllers/msgsendmsg.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/users",checkLogin,getusers);

router.get("/:id",checkLogin,getmsg);

router.post("/send/:id",checkLogin,sendmsg);

export default router;