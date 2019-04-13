const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const mongoose = require('mongoose')
const User = mongoose.model('user')
const keys = require('../config/keys');

const auth = async(req, res, next) => {
    console.log('auth middleware');
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log("================= TOKEN ===============")
        console.log(token)
        const decoded = jwt.verify(token, keys.secret);
        const { _id } = decoded;
        const user = await User.findById(_id);
        if(!user) { throw new Error() } 
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send( {'error': 'Please authenticate. '} );
    }
}

 
module.exports = auth;