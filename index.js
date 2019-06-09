const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
// const fileUpload = require('express-fileupload');
// const querystring  = require('querystring')
const multer = require('multer');

require('./models/User');
require('./models/Message');
require('./models/City');
// require('./models/ConstructionType'); // ??
require('./models/Neighborhood');
// require('./models/Offer'); // ??
require('./models/OfferType');
require('./models/Phone');

require('./models/FilterValue');
require('./models/Filter');
require('./models/EstateFilter');
require('./models/EstateType');


require('./models/Flat');
require('./models/House');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file')); // image отговаря на името на инпута 
// app.use(multer({dest:'images'}).single('file')); // image отговаря на името на инпута 
// app.use(fileUpload());

mongoose.connect(keys.mongoURI, () => {
    console.log('mongo work');

    console.log('Create DB Objects');

    async function filters () {

        const EstateType = mongoose.model('estate-type');
        const FilterValue = mongoose.model('filter-value');
        const Filter = mongoose.model('filter');
        const EstateFilter = mongoose.model('estate-filter');



        const estateType = '5cefe1d0db8bc8472852247a';

        let forSend = [];

        const estateFilters = await EstateFilter
            .find({ estateTypeId: estateType })
            .populate('filterId');
        console.log(estateFilters);


        for (let i = 0; i < estateFilters.length; i++) {
            const filterValues = await FilterValue.find({ filterId: estateFilters[i].filterId })
            forSend.push({
                filterName: estateFilters[i].filterId.name,
                filterValues
            });
        }
    }

    async function createOfferTypes () {
        const OfferType = mongoose.model('offer-type');
        const of1 = await new OfferType({ name: 'купува' }).save();
        const of2 = await new OfferType({ name: 'продава' }).save();
        const of3 = await new OfferType({ name: 'отдава' }).save();
        console.log(of1, of2, of3)
    }
    // createOfferTypes()

    // filters()

    async function createFilters () {

        const FilterValue = mongoose.model('filter-value');
        const Filter = mongoose.model('filter');
        const EstateFilter = mongoose.model('estate-filter');
        const EstateType = mongoose.model('estate-type');

        console.log('=============== START =================')

        const f1 = await new Filter({ name: 'Преход', estateProp: 'hasTransitioning' }).save();
        const f2 = await new Filter({ name: 'Обзавеждане', estateProp: 'hasFurnituring'  }).save();
        const f3 = await new Filter({ name: 'Тип Апартамент', estateProp: 'flatType'  }).save();
        const f4 = await new Filter({ name: 'Вид Строителство', estateProp: 'constructionType'  }).save();
        const f5 = await new Filter({ name: 'Отопление', estateProp: 'heatingType'  }).save();
        const f6 = await new Filter({name: 'Брой етажи на сградата', estateProp: 'numberOfFloors'}).save();

        console.log('==== filters ====');

        const fv1 = await new FilterValue({ name: 'С преход', filterId: f1._id }).save();
        const fv2 = await new FilterValue({ name: 'Без преход', filterId: f1._id }).save();

        const fv4 = await new FilterValue({ name: 'Обзаведен', filterId: f2._id }).save();
        const fv5 = await new FilterValue({ name: 'Полуобзаведен', filterId: f2._id }).save();
        const fv6 = await new FilterValue({ name: 'Необзаведен', filterId: f2._id }).save();

        const fv7  = await new FilterValue({ name: '1 - стаен', filterId: f3._id }).save();
        const fv8  = await new FilterValue({ name: '2 - стаен', filterId: f3._id }).save();
        const fv9  = await new FilterValue({ name: '3 - стаен', filterId: f3._id }).save();
        const fv10 = await new FilterValue({ name: '4 - стаен', filterId: f3._id }).save();
        const fv11 = await new FilterValue({ name: 'Многостаен', filterId: f3._id }).save();
        const fv12 = await new FilterValue({ name: 'Мезонет', filterId: f3._id }).save();

        const fv13 = await new FilterValue({ name: 'Тухла', filterId: f4._id }).save();
        const fv14 = await new FilterValue({ name: 'Панел', filterId: f4._id }).save();
        const fv15 = await new FilterValue({ name: 'ЕПК', filterId: f4._id }).save();
        const fv16 = await new FilterValue({ name: 'ПК', filterId: f4._id }).save();
        const fv17 = await new FilterValue({ name: 'Гредоред', filterId: f4._id }).save();

        const fv19 = await new FilterValue({ name: 'ТЕЦ', filterId: f5._id }).save();
        const fv20 = await new FilterValue({ name: 'Локално', filterId: f5._id }).save();
        const fv21 = await new FilterValue({ name: 'Електричество', filterId: f5._id }).save();
        const fv22 = await new FilterValue({ name: 'Газ', filterId: f5._id }).save();
        const fv23 = await new FilterValue({ name: 'Печка, камина', filterId: f5._id }).save();
        const fv24 = await new FilterValue({ name: 'Соларни панели', filterId: f5._id }).save();
        const fv25 = await new FilterValue({ name: 'Термо помпа', filterId: f5._id }).save();
        const fv26 = await new FilterValue({ name: 'Прокарва се', filterId: f5._id }).save();
        const fv27 = await new FilterValue({ name: 'Без отопление', filterId: f5._id }).save();

        const fv28 = await new FilterValue({name: '1', filterId: f6._id}).save();
        const fv29 = await new FilterValue({name: '2', filterId: f6._id}).save();
        const fv30 = await new FilterValue({name: '3', filterId: f6._id}).save();
        const fv31 = await new FilterValue({name: 'Над 3', filterId: f6._id}).save();

        console.log();
        console.log('=== filter-values ===');
        console.log();

        // const estateType = await new EstateType({ name: 'апартамент' }).save();
        // console.log();
        // console.log('=== estateType ===');
        // console.log(estateType);
        const estateTypeFlatId = '5cf0dc58a53ff751e4db3c3b'
        const estateTypeHouseId = '5cefe1d0db8bc8472852247a'
        const ef1 = await new EstateFilter({ estateTypeId: estateTypeFlatId, filterId: f1._id }).save();
        const ef2 = await new EstateFilter({ estateTypeId: estateTypeFlatId, filterId: f2._id }).save();
        const ef3 = await new EstateFilter({ estateTypeId: estateTypeFlatId, filterId: f3._id }).save();
        const ef4 = await new EstateFilter({ estateTypeId: estateTypeFlatId, filterId: f4._id }).save();
        const ef5 = await new EstateFilter({ estateTypeId: estateTypeFlatId, filterId: f5._id }).save();


        const ef7 = await new EstateFilter({ estateTypeId: estateTypeHouseId, filterId: f2._id }).save();
        const ef8 = await new EstateFilter({ estateTypeId: estateTypeHouseId, filterId: f4._id }).save();
        const ef9 = await new EstateFilter({ estateTypeId: estateTypeHouseId, filterId: f5._id }).save();
        const ef10 = await new EstateFilter({ estateTypeId: estateTypeHouseId, filterId: f6._id }).save();

        console.log('=== estateFilter ===');
        console.log('flat filters')
        console.log(ef1, ef2,ef3);
        console.log('house filters')
        
        console.log(ef7, ef8,ef9);
        console.log('====================== END ! ======================')
    }
    // createFilters()


    // async function addFileterToEstate() {
    //     const EstateFilter = mongoose.model('estate-filter');
    //     const filterId = '5cefe1cfdb8bc84728522473';
    //     const estateTypeId = '5cf0dc58a53ff751e4db3c3b'; 
    //     const ef1 = await new EstateFilter({ estateTypeId, filterId }).save();
    //     console.log(ef1);
    // }
});

app.use((req, res, next) => {
    console.log("==========-!-===========");
    console.log(req.method, req.path, req.query);
    console.log("==========-!-===========");
    next();
});



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


require('./routes/auth-routes')(app);
require('./routes/messages-routes')(app);
require('./routes/offer-routes')(app);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server listen on port: ' + PORT);
});