const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const dishId = msg.id;
        const RestaurantId = msg.id1;
        
        let restaurant = await Restaurant.findOne({ RestaurantId: RestaurantId });
        callback(null, restaurant.Dishes.id(dishId));
    }
}

exports.handle_request = handle_request;