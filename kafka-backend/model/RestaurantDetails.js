const mongoose = require("mongoose");

const dishSchema = new  mongoose.Schema({
    RestaurantId: { type: mongoose.Types.ObjectId},
    DishName: { type: String, required: true },
    DishDesc: { type: String, required: true },
    DishCategory: { type: String, required: true },
    DishType: { type: String, required: true },
    Price: { type: Number, required: true },
    DishImage: { type: String, required: true }
});

const RestaurantDetails = new mongoose.Schema({
    RestaurantId: {type: mongoose.Types.ObjectId, auto: true },
    RestaurantName: { type: String},
    RestaurantEmail: { type: String, required: true},
    RestaurantPassword: {type: String, required: true },
    Location: {type: String,max: 1024 },
    RestaurantDesc: {type: String },
    PhoneNumber: {type: String, max: 1024},
    WorkHrsFrom: { type: String },
    WorkHrsTo: {type: String, max: 1024},
    AddressId: {type: String},
    Image: {type: String},
    Country: { type: String },
    City: {type: String},
    PinCode: { type: String, min: 6, max: 10 },
    State: { type: String, max: 1024},
    DeliveryMode: {type: String, max: 1024 },
    Dishes: [dishSchema]
});

module.exports = mongoose.model("RestaurantDetails", RestaurantDetails);