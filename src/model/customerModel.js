const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },

    lastName : { type: String, required: true, trim: true },

    mobileNumber : { type: String, required: true, trim: true },//10digit number

    DOB  : { type: Date, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    address : { type: String, required: true, trim: true },

    customerID : { type: String,  trim: true },// UUID

    status  : { type: String, required: true, enum:[ACTIVE,INACTIVE] ,trim: true }

}, { timestamps: true });


module.exports = mongoose.model('Author', customerSchema)