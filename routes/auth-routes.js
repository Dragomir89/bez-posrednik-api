const authService = require('../services/auth');;
const auth = require('../middleware/auth');

module.exports = (app) => {
    console.log("TEST")
    app.post( '/login', authService.login);
    app.post( '/register', authService.register);
    app.get( '/get-user', auth, authService.getUser);

}
