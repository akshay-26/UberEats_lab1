const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")
const Customer = require("../../model/CustomerDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const CustomerId = msg.id;
        console.log(CustomerId);
        let restId = [];
        var count = 0;
    
        let customer = await Customer.findOne({ CustomerId: CustomerId });
        if (!customer) {
            callback(null,"Customer not found");
        }
        const restaurantIds = customer.Favourites.toObject();
        const favourites = await Restaurant.find({RestaurantId: {$in: restaurantIds}});
        callback(null,favourites);
    }
}

exports.handle_request = handle_request;