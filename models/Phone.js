const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const phoneSchema = new Schema({
    number: {type: String, required: true, unique: true},
    userId: {type: ObjectId, ref: 'user', required: true}
});

mongoose.model('phone', phoneSchema);