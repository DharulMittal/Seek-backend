import Message from "../models/msg.js";

export const getmsg = async (req, res) => {
    try {
        const {id : recieverid} = req.param;
        const senderid = req.user._id;

        const msg = await Message.find({
            $or: [
                {sender: senderid, reciever: recieverid},
                {sender: recieverid, reciever: senderid}
            ]
        })
        res.status(200).json(msg);

    } catch (error) {
        console.log(error);
    }
};