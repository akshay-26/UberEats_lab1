const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")
const Customer = require("../../model/CustomerDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const restaurantId = msg.id;
        const restaurant = await Restaurant.findOne({RestaurantId:restaurantId});
        callback(null,restaurant);
    }
}

exports.handle_request = handle_request;