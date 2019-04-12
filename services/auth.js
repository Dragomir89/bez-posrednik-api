const mongoose = require('mongoose')
const User = mongoose.model('user')

function register(req, res) {
    new User({    
        firstName: 'Ivan',
        lastName: 'Ivanov',
        password: '123456',
        email: 'test@test.com'
    }).save().then(dbUser => {
        res.send(dbUser);
    });

}

module.exports = {
    register
}