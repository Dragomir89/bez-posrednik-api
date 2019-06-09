const mongoose = require('mongoose')
const User = mongoose.model('user')

async function register(req, res) {
    console.log('-=-=-=-=-=register body -=-=-=-=')
    console.log(req.body);
    console.log(req.user);

    console.log('-=-=-=-=-=register body -=-=-=-=')
    req.user = {};
    try {
        const { firstName, lastName, password, email } = req.body;
        // const conversations = [];
        // const user = await new User({ firstName, lastName, password, email}).save()
        new User({ firstName, lastName, password, email}).save()
        .then((user) => {
            console.log(user)
            res.send(user);
        }).catch((e) =>{
            console.log(e);
        })
    
    } catch (e) {
        console.log("REGISTER FAILD")
        console.log(e)
        res.status(400).send({error: e.message});
    }
}

async function login(req, res) {
    
    try{
        const { email, password } = req.body;
        const user = await User.findUserByCredentials(email, password);
        const token = await user.generateAuthToken();
        const {firstName, lastName} = user;
        res.send({ firstName, lastName, email, token});
    }  catch (e) {
        res.status(400).send(e);
    }

}

function getUser(req,res) {
    res.send(req.user);
}

module.exports = {
    register,
    login,
    getUser
}

// function normalizePhoneNumber(phoneNumber){
//     return phoneNumber.split(/\D+/).join("")
// }