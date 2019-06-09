const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const filterValueSchema = new Schema({ 
    name: {type: String, required: true, unique: true},
    filterId: {type: ObjectId, required: true, ref:'filter'}
});

mongoose.model('filter-value', filterValueSchema);
