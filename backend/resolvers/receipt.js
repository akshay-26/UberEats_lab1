const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const Order = require("../model/Orders")


const receiptResolvers = {
    Query: {
        async getReceipt(_, {OrderId}) {
            const order = await Order.findOne({OrderId:OrderId});
            console.log("ORders", order)
            return order.OrderDetails
        }
    },
}

module.exports = receiptResolvers;