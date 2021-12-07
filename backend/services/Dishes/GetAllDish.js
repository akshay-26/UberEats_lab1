const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const dishId = msg.id;
    const restaurants = await Restaurant.find();
    let dishes = [];
    restaurants.map(restaurant => dishes.push(...restaurant.Dishes));
    callback(null, dishes);

    }
}

exports.handle_request = handle_request;