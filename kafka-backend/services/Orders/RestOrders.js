const mongoose = require("mongoose")
const Order = require("../../model/Orders")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)
    console.log("msg len", Object.keys(msg).length)
    if(Object.keys(msg).length==2){

    {
        const OrderStatus = msg.id2;
    const OrderId= msg.id1;

    console.log("if order")

    const order = await Order.findOne({OrderId:OrderId});
    console.log("Rest ORder", order)
    order.OrderStatus = OrderStatus;
    const savedOrder = await order.save();
    callback(null, savedOrder);
    }
}
else if(Object.keys(msg).length > 4){
    console.log("else if")
    console.log("orders", msg)
    console.log(msg.Instructions)
    //let orderId = uuidv4();
    //let customerId = req.params.id;
    let cart = msg.cart;
   
    var dateString = new Date();
    dateString1 = new Date(dateString).toLocaleString()
    currentTimeStamp = dateString1.split(' ').slice(0, 5).join(' ');
  
    let orderDetails = [];

    cart.map(
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
        CustomerId: msg.customerId,
        CustomerName: msg.CustomerName,
        RestaurantName: msg.RestaurantName,
        ImageUrl: msg.ImageUrl,
        RestaurantId: msg.restaurantId,
        OrderStatus: "Order Received",
        DeliveryType: msg.deliverytype,
        CreatedAt: currentTimeStamp,
        LastUpdatedTime: currentTimeStamp,
        DeliveryAddress: msg.DeliveryAddress,
        OrderDetails: orderDetails,
        Instructions: msg.Instructions
    }
    const order = new Order({...orderPayload}); 
    const savedOrder = await order.save()
    callback(null, savedOrder);
}
else{
    const OrderId= msg.id1;

    console.log("cancel order")
    const order = await Order.findOne({OrderId:OrderId});
    order.OrderStatus = "Cancel Order";
    const savedOrder = await order.save();
    callback(null, savedOrder);
}
}

exports.handle_request = handle_request;