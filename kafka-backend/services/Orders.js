const mongoose = require("mongoose")
const Order = require("../model/Orders")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const CustomerId = msg.id;
        console.log(CustomerId)
        const order = await Order.find({CustomerId:CustomerId});
        console.log("ORders", order)
        callback(null, order);
    }
}

exports.handle_request = handle_request;