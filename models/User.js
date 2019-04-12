const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: {type: String, require, minlength: 5},
    email: {type: String, require},
    role:{ type: String, default:"user"}
})


mongoose.model('user', userSchema);
