const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Customer = require("../../model/CustomerDetails")
const Restaurant = require("../../model/RestaurantDetails")


async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const customerId = msg.id;
        console.log(customerId)
        let customer = await Customer.findOne({CustomerId:customerId});
        if (!customer) {
            callback(null,"Customer not found");
        }
        const deliveryAddress = customer.Address || [];
        if (deliveryAddress) {
            callback(null,deliveryAddress);
        }
    }
}

exports.handle_request = handle_request;