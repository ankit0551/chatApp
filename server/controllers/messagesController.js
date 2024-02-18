const Conversation = require('../models/Conversation');

const Message = require('../models/Message');



module.exports.sendMessage = async (req, res) =>{
    try{
        const rId = req.params.id;
        const sId = req.user._id;
        const {message} = req.body;

        let conversation = await Conversation.findOne({participants : {$all: [sId, rId]}});
        if(!conversation){
            conversation = await Conversation.create({
                participants : [sId, rId],
            });
        }

        const newMessage = await Message.create({
            senderId : sId,
            receiverId : rId,
            message 
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await conversation.save();
        res.status(201).json(newMessage);

    }catch(error){
        console.log(error);
    }
    
}

module.exports.getMessages = async (req, res) => {
    try{
        const cId = req.params.id;
        const sId = req.user._id;

        const conversation = await Conversation.findOne({participants : {$all: [sId, cId]}}).populate('messages');
        res.status(200).json(conversation.messages);

    }catch(error){
        console.log(error);
    }
}