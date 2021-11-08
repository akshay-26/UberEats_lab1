const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")
const Customer = require("../../model/CustomerDetails")

async function handle_request(msg, callback) {
    var res = {}
    console.log("msg type", msg)

    {
        const restaurantId = mongoose.Types.ObjectId(msg.restaurantId);
        let restaurant = await Restaurant.findOne({ RestaurantId: restaurantId });
        if (!restaurant) {
            callback(null, "Restaurant not found");
        }

        payload = {
            RestaurantName: msg.name,
            RestaurantDesc: msg.desc,
            PhoneNumber: msg.phone,
            DeliveryMode: msg.mode,
            Country: msg.country,
            State: msg.state,
            City: msg.city,
            PinCode: msg.pincode,
            Image: msg.imageUrl,
            WorkHrsFrom: msg.fromHrs,
            WorkHrsTo: msg.toHrs
        }

        Restaurant.findOneAndUpdate({ RestaurantId: restaurantId }, payload, { returnNewDocument: true }, function (err, updateRestaurant) {
            if (err) callback(null, err);
            return callback(null, updateRestaurant);
        });
    }
}

exports.handle_request = handle_request;