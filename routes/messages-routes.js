const messageService = require('../services/message');;
const auth = require('../middleware/auth');

module.exports = (app) => {
    
    app.post( '/message-send', messageService.send);
    // app.post( '/message-show/:userId', messageService.show);
}
