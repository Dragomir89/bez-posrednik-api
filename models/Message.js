const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    date: Date,
    receiverId: {type: ObjectId, ref: 'user', required: true},
    senderId: {type: ObjectId, ref: 'user', required: true},
    message: {type: String, required: true},
    isReaded: {type: Boolean, default: false}
});

mongoose.model('message', messageSchema);