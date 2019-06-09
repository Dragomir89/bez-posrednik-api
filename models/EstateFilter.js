const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const estateFilterSchema = new Schema({
    // name: {type: String, required: true, unique: true},
    // filters: [{type: ObjectId, unique: true, ref:'filter'}]
    estateTypeId:{ type: ObjectId, ref: 'estate-type'},
    filterId: {type: ObjectId, ref:'filter'},
});

mongoose.model('estate-filter', estateFilterSchema);