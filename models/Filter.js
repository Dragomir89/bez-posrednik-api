const mongoose = require('mongoose');
const { Schema } = mongoose;

const filterSchema = new Schema({ 
    name: {type: String, required: true, unique: true},
    estateProp: {type: String, required: true, unique: true}
});

mongoose.model('filter', filterSchema);
