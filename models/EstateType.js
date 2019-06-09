const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const estateTypeSchema = new Schema({ //апартамент, къща
    name: {type: String, required: true, unique: true}
    // estateFiltreIds: [{type: ObjectId, ref: 'estate-filter'}]
});

mongoose.model('estate-type', estateTypeSchema);