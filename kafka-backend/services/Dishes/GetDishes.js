const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const dishId = msg.id;
    let dishes = await Restaurant.findOne({RestaurantId:dishId})
    callback(null, dishes.Dishes);
    }
}

exports.handle_request = handle_request;