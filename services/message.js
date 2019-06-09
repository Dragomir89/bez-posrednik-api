const mongoose = require('mongoose');
const Message = mongoose.model('message');
const User = mongoose.model('user');

async function send (req, res) {
    // const msg  = { 
    //     date: new Date(),
    //     receiverId: req.body.receiverId,
    //     senderId: req.body.user._id,
    //     message: req.body.message,
    // }
    req.body.receiverId = "5cb985a44de6f144bc54f215";
    req.user = {};
    req.user.userId = "5cb985774de6f144bc54f213";
    const msg  = { 
        date: new Date(),
        receiverId: "5cb985a44de6f144bc54f215",
        senderId: "5cb985774de6f144bc54f213",
        message: "Hop Hop tuk li si ?"
    }
    const dbMessage = await new Message(msg).save();
    console.log(dbMessage);

    const receiver = await User.findById(req.body.receiverId);
    const sender = await User.findById(req.user.userId); ///req.body.user._id
    let receiverCoversations = [...receiver.conversations] //receiver.conversations.push(req.body.user._id);
    let senderCoversations = [...sender.conversations]
    
    receiverCoversations = addCinversarionUserId(receiverCoversations, req.user.userId);
    senderCoversations = addCinversarionUserId(senderCoversations, req.body.receiverId)

    await User.findOneAndUpdate({_id:req.user.userId}, {conversations:senderCoversations});
    await User.findOneAndUpdate({_id:req.body.receiverId}, {conversations:receiverCoversations});

    res.send({ 
        success: "OK",
        dbMessage
    })
}

function addCinversarionUserId(conversations, userId) {
    const userIdPosition = conversations.indexOf(userId);
    if(userIdPosition == -1) {
        conversations.push(userId);
    }else {
        console.log('move existing userId');
        conversations.splice(userId, userId + 1); 
    }
    return conversations;
}

module.exports = {
    send
}