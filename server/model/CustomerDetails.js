const mongoose = require("mongoose");

const CustomerDetails = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    EmailId: {
        type: String,
        required: true,
        max: 255,
    },
    CustomerName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    CustomerPassword: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    DoB: {
        type: String,
        min: 6,
        max: 1024
    },
    PhoneNumber: {
        type: String,
        min: 6,
        max: 1024
    },
    NickName: {
        type: String,
        min: 6,
        max: 1024
    },
    AddressId: {
        type: String,
        min: 6,
        max: 1024
    },
    Image: {
        type: String,
        min: 6,
        max: 1024
    },
    Country: {
        type: String,
        min: 6,
        max: 1024
    },
    City: {
        type: String,
        min: 6,
        max: 1024
    },
    State: {
        type: String,
        min: 6,
        max: 1024
    },
    ZipCode: {
        type: String,
        min: 6,
        max: 1024
    }
});

module.exports = mongoose.model("CustomerDetails", CustomerDetails);