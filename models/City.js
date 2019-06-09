const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: {type: String, required: true, unique: true}
});

mongoose.model('city', citySchema);