const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")
const Customer = require("../../model/CustomerDetails")
async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        console.log(msg.id1, msg.id2)
        try{
            const CustomerId = mongoose.Types.ObjectId(msg.id1);
        const RestaurantId = mongoose.Types.ObjectId(msg.id2);
        console.log(RestaurantId, CustomerId)
        let customer = await Customer.findOne({ CustomerId: CustomerId });
        if (!customer) {
            callback(null, "Customer not found");
        }
        customer.Favourites.push(RestaurantId);
        updatedCustomer = await customer.save()
        callback(null, updatedCustomer);
    }catch (error) {
        console.log(error);
        callback(null,error);
    }
        
    }
}

exports.handle_request = handle_request;