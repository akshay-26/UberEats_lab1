const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const restaurantId = msg.id;
        let restaurant = await Restaurant.findOne({ RestaurantId: restaurantId });
        callback(null,restaurant.Dishes);
    }
}

exports.handle_request = handle_request;