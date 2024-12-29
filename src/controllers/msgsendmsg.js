import Message from "../models/msg.js";
import cloudinary from '../lib/claudinary.js';
import { getSocketId,io } from "../lib/socket.js";

export const sendmsg = async (req, res) => {
    try {
        const {text , img} = req.body;
        const senderid = req.user._id;
        const {id : recieverid} = req.params;
        let imgurl;
        if(img){
            const upload = await cloudinary.uploader.upload(img);
            imgurl = upload.secure_url;
        }

        const newmsg = new Message({
            sender: senderid,
            reciever: recieverid,
            text: text,
            img : imgurl
        })
        await newmsg.save();

        // Socket io
        const rSocketId = getSocketId(recieverid);
        if (rSocketId) {
            io.to(rSocketId).emit("newmsgs",newmsg)
        }

        res.status(200).json(newmsg);
    } catch (error) {
        console.log(error);        
    }
};
