const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const Order = require("../model/Orders")


const orderResolvers = {
    Query: {
        async getCustomerOrder(_, {CustomerId}) {
            const order = await Order.find({CustomerId:CustomerId});
            console.log("ORders", order)
            return order;
        },
        async getRestaurantOrder(_, {RestaurantId}) {
            const order = await Order.find({RestaurantId:RestaurantId});
            console.log("ORders", order)
            return order;
        }
    },
    Mutation: {
        async updateOrderStatus(_, {OrderId, OrderStatus}){
            const order = await Order.findOne({OrderId});
            order.OrderStatus = OrderStatus;
            const savedOrder = await order.save();
            console.log(savedOrder)
            return savedOrder;
          }
    }
}


module.exports = orderResolvers;