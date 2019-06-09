const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: {type: String, required: true, minlength: 5},
    email: {type: String, required: true, unique: true},
    phones:[{ type : ObjectId, ref: 'phone', required: true, unique: true }],
    messages: [{ type : ObjectId, ref: 'message' }],
    role:{ type: String, default:"user"},
});


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign( {_id: user._id.toString() }, keys.secret);
    await user.save();

    return token;
}

userSchema.statics.findUserByCredentials = async function (email, password) {
    const errMsg = 'Unable to login';

    const user = await this.findOne({email});
    if(!user) { return new Error(errMsg)}

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) { return new Error(errMsg)}

    return user;
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) { // event befor save
    const user = this;
    
    if(user.isModified('password')) {
        console.log('Modified Password --> password is hashed !!!')
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});


mongoose.model('user', userSchema);
