const authService = require('../services/auth');;

module.exports = (app) => {
    
    app.get( '/login', authService.register);

}
