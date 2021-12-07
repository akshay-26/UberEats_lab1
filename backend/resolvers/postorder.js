const { UserInputError } = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const Orders = require("../model/Orders")

const postorderResolvers = {
    Mutation: {
        async postOrder(_, { Order }) {
            var dateString = new Date();
            dateString1 = new Date(dateString).toLocaleString()
            currentTimeStamp = dateString1.split(' ').slice(0, 5).join(' ');

            let orderDetails = [];

            Order.OrderDetails.map(
                item => {
                    orderDetails.push({
                        DishName: item.DishName,
                        DishDesc: item.DishDesc,
                        Quantity: item.Quantity,
                        Price: item.Price
                    });
                }
            );

            let orderPayload = {
                CustomerId: Order.CustomerId,
                CustomerName: Order.CustomerName,
                RestaurantName: Order.RestaurantName,
                ImageUrl: Order.ImageUrl,
                RestaurantId: Order.RestaurantId,
                OrderStatus: "Order Received",
                DeliveryType: Order.DeliveryType,
                CreatedAt: currentTimeStamp,
                LastUpdatedTime: currentTimeStamp,
                DeliveryAddress: Order.DeliveryAddress,
                OrderDetails: orderDetails,
                Instructions: Order.Instructions
            }
            const order = new Orders({ ...orderPayload });
            const savedOrder = await order.save()
            return savedOrder;
        }
    }
}

module.exports = postorderResolvers;