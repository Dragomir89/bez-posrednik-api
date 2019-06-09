const mongoose = require('mongoose');
const City = mongoose.model('city');
const Neighborhood = mongoose.model('neighborhood');
const OfferType = mongoose.model('offer-type');
const Phone = mongoose.model('phone');
const EstateType = mongoose.model('estate-type');
const FilterValue = mongoose.model('filter-value');
const EstateFilter = mongoose.model('estate-filter');

const Flat = mongoose.model('flat');
const House = mongoose.model('house');


async function getAllFilters(req, res, next) {
    console.log('========== get All filters =============')
    let forSend = []
    estateFilters = await EstateFilter.find().populate('filterId');

    for (let i = 0; i < estateFilters.length; i++) {
        const filterValues = await FilterValue.find({ filterId: estateFilters[i].filterId })
        const { name, _id, estateProp } = estateFilters[i].filterId
        forSend.push({ name, _id, estateProp, filterValues });
    }
    res.send(forSend);
}

async function getFilters (req, res, estateTypeId) {
    console.log('========== get filters =============')
    let forSend = [];
    let estateFilters = [];
    estateTypeId
        estateFilters = await EstateFilter
            .find({ estateTypeId })
            .populate('filterId');
    
    for (let i = 0; i < estateFilters.length; i++) {
        const filterValues = await FilterValue.find({ filterId: estateFilters[i].filterId })
        const { name, _id, estateProp } = estateFilters[i].filterId
        forSend.push({ name, _id, estateProp, filterValues });
    }
    res.send(forSend);
}

async function addOfferProperty (req, res) {
    const { offerProp, name } = req.body;

    console.log(req.body);
    try {
        switch (offerProp) {
            case 'city':
                const city = await new City({ name }).save();
                res.send({ city });
                break;
            // case 'construction-type':
            // const constructionType = await new ConstructionType({ name }).save();
            // res.send({constructionType});
            // break;
            case 'estateType':
                const estateType = await new EstateType({ name }).save();
                res.send({ estateType });
                break;
            case 'neighborhood':
                const { cityId } = req.body;
                const neighborhood = await new Neighborhood({ name, cityId }).save();
                res.send(neighborhood);
                break;
            case 'offerType':
                const offerType = await new OfferType({ name }).save();
                res.send({ offerType });
                break;
            default:
                res.send({ error: 'invalid offerProp' });
        }
    } catch (error) {
        res.send(error);
    }
}

async function getOfferProp (req, res) {
    const { name } = req.params
    switch (name) {
        case 'city':
            let cities = [];
            const allCities = await City.find({});
            for (let i = 0; i < allCities.length; i++) {
                const neighborhoods = await Neighborhood.find({ cityId: allCities[i]._id });
                const city = { _id: allCities[i]._id, name: allCities[i].name, neighborhoods };
                cities.push(city);
            }
            res.send(cities);
            break;
        case 'estateType':
            const estateTypes = await EstateType.find({});
            res.send(estateTypes);
            break;
        case 'offerType':
            const offerTypes = await OfferType.find({});
            res.send(offerTypes);
            break;
        case 'estate-filters':
            const { estateTypeId } = req.query;
            getFilters(req, res, estateTypeId);
            return;
        default:
            res.send('Invalid parameter !')
            break;

    }
}

async function addEstate (req, res) {

    const { estateType, offerType, city, neighborhood, price, area, shortDescription, descriptiion } = req.body;
    let image = req.file;
    if (!image) {
        res.status(422);
        res.send('invalid IMG');
        return;
    }

    if(area < 1) {
        res.status(406);
        res.send('Invalid Area');
        return;
    }

    const imageUrl = image.path;
    let images = [imageUrl];
    const estateTypeObj = await EstateType.findById(estateType);


    if (estateTypeObj.name === 'апартамент') {
        const {
            flatType,
            hasFurnituring,
            hasTransitioning,
            constructionType,
            heatingType,
            floоr,
            isLastFloor } = req.body;
        await new Flat(
            {
                offerType,
                city,
                neighborhood,
                price,
                area,
                shortDescription,
                description,
                images,
                flatType,
                hasFurnituring,
                hasTransitioning,
                constructionType,
                heatingType,
                floоr,
                isLastFloor
            }).save();

        const flats = await Flat.find()
            .populate('offerType city neighborhood flatType hasFurnituring hasTransitioning constructionType heatingType');
            res.send({success:true, flats});
    } else if (estateTypeObj.name === 'къща') {
        const {
            hasFurnituring,
            constructionType,
            heatingType,
            numberOfFloors } = req.body;
        await new House(
            {
                offerType,
                city,
                neighborhood,
                price,
                area,
                shortDescription,
                description,
                images,
                hasFurnituring,
                constructionType,
                heatingType,
                numberOfFloors
            }).save();
        const houses = await House.find()
        .populate('offerType city neighborhood hasFurnituring constructionType heatingType numberOfFloors');
        res.send({success:true, houses});
    }
}


module.exports = {
    addOfferProperty,
    getOfferProp,
    getFilters,
    addEstate,
    getAllFilters
} 