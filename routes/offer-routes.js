const offerService = require('../services/offer');;
const auth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/get-all-estate-filters', offerService.getAllFilters);
    app.post( '/add-offer-property', offerService.addOfferProperty);
    app.get('/get-offer-prop/:name', offerService.getOfferProp);
    app.get('/get-estate-filters', offerService.getFilters);
    app.post('/add-estate-picture', offerService.addEstate);
}
