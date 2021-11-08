const mongoose = require("mongoose")
const Order = require("../../model/Orders")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const orderId = msg.id;
        const order = await Order.findOne({OrderId:orderId});
        console.log("ORders", order)
        callback(null, order);
    }
}

exports.handle_request = handle_request;