const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardNumber : { type: String, required: true, trim: true },

    cardType : { type: String, required: true, enum:[REGULAR,SPECIAL],trim: true },

    customerName  : { type: String, required: true, trim: true },//10digit number

    status   : { type: String, required: true, Default: ACTIVE ,enum:[ACTIVE/INACTIVE] ,trim: true },

    vision : { type: String, required: true, unique: true, trim: true },

    address : { type: String, required: true, trim: true },

    customerID : { type: String, required: true, trim: true },// UUID

}, { timestamps: true });


module.exports = mongoose.model('Author', cardSchema)