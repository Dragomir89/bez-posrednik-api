const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

let neighborhoodSchema = new Schema({
    name: { type: String, required: true },
    cityId: { type: ObjectId, required: true, ref: 'city'}
});


neighborhoodSchema.index({ name: 1, cityId: -1}, { unique: true });

mongoose.model('neighborhood', neighborhoodSchema);