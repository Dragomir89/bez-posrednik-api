const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

require('./models/User');


const app = express();

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI,() => {
    console.log('mongo work');
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


require('./routes/auth-routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server listen on port: ' + PORT);
});