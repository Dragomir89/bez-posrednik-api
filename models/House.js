const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const houseSchema = new Schema({ //Kushta
    city:             { type: ObjectId, required: true, ref: 'city' },
    neighborhood:     { type: ObjectId, required: true, ref: 'neighborhood' },
    offerType:        { type: ObjectId, required: true, ref: 'offer-type' },
    price:            { type: Number, required: true },
    area:             {type: Number, required: true},
    shortDescription: { type: String},
    description:      { type: String},
    numberOfFloors:   { type: ObjectId, required: true, ref: 'filter-value' },
    constructionType: { type: ObjectId, required: true, ref: 'filter-value' },
    hasFurnituring:   { type: ObjectId, required: true, ref: 'filter-value'},
    heatingType:      { type: ObjectId, required: true, ref: 'filter-value'},
    images:          [{ type: String }]
});

mongoose.model('house', houseSchema);
