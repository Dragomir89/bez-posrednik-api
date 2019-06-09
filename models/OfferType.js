const mongoose = require('mongoose');
const { Schema } = mongoose;

let offerTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
});


mongoose.model('offer-type', offerTypeSchema);