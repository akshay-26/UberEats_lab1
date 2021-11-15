const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');
const Order = require("../model/Orders")
const kafka = require("../kafka/client")
const mongoose = require("mongoose");
const Customer = require("../model/CustomerDetails")
const { checkAuth } = require("../utils/passport");

router.get("/Orders/:id", checkAuth, async function (req, res) {
    const CustomerId = req.params.id;
   kafka.make_request("Orders", req.params, function(err, results) {
       console.log("In result")
       console.log("result in msg", results)
       if(err){
           console.log("err", err)
           res.json({
               status: "Error",
               msg: "Error",
           })
           res.status(400).end();
       } else
       {
           console.log("inside else", results)
           res.status(200).send(results)
       }
   })
});


// mongo

// router.get("/Orders/:id", async function (req, res) {
//     const CustomerId = req.params.id;
//     const order = await Order.find({CustomerId:CustomerId});
//     res.status(200).send(order);
// });

// mongo

// router.get("/restaurant/Orders/:id", function (req, res) {
//     const RestaurantId = req.params.id;
//     const query = "SELECT * FROM orders where CustomerId = ?";

//     const query1 = "select * from orders inner join Customer1 on orders.CustomerId = Customer1.CustomerId where RestaurantId = ?" ;

//     con.query(query1, [RestaurantId], (err, results, fields) => {
//         res.status(200).send(results);

//     });
// });


// mongo


router.get("/restaurant/Orders/:id", checkAuth, async function (req, res) {
    const RestaurantId = req.params.id;
    const orders = await Order.find({RestaurantId:RestaurantId});
    const customer = await Customer.find({CustomerId:orders.CustomerId});
    //const result = 
    // var response = Order.aggregate([ { "$match": { "CustomerId": customer.CustomerId } },
    // { "$unwind": "$Customer" },
    // { "$match": { "Customer.CustomerId": orders.CustomerId } },{
    //     $lookup:{
    //         from: "Customer",
    //         localField:"CustomerId",
    //         foreignField:"CustomerId",
    //         as:"orderRes"
    //     }
    // }],function( err, data ) {

    //     if ( err )
    //       throw err;
    
    //     //console.log( JSON.stringify( data ));
    //     
    //   })
    // console.log(orderRes)
    res.status(200).send(orders);
});

//mongo



// mongo /restaurant/Orders/:id1/:id2
router.post("/restaurant/Orders/:id1/:id2", checkAuth, async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("RestOrders", req.params, function(err, results) {
       console.log("In result")
       console.log("result in msg", results)
       if(err){
           console.log("err", err)
           res.json({
               status: "Error",
               msg: "Error",
           })
           res.status(400).end();
       } else
       {
           console.log("inside else", results)
           res.status(200).send(results)
       }
   })
});



// router.post("/restaurant/Orders/:id1/:id2", async function (req, res) {
//     const OrderStatus = req.params.id2;
//     const OrderId= req.params.id1;

//     console.log("i am here")

//     const order = await Order.findOne({OrderId:OrderId});
//     order.OrderStatus = OrderStatus;
//     const savedOrder = await order.save();
//     res.status(200).send(savedOrder);
   
// })

// mongo /restaurant/Orders/:id1/:id2



// mongo cancel order

router.post("/restaurant/CancelOrders/:id1",checkAuth, async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("RestOrders", req.params, function(err, results) {
       console.log("In result")
       console.log("result in msg", results)
       if(err){
           console.log("err", err)
           res.json({
               status: "Error",
               msg: "Error",
           })
           res.status(400).end();
       } else
       {
           console.log("inside else", results)
           res.status(200).send(results)
       }
   })
});

// router.post("/restaurant/CancelOrders/:id1", async function (req, res) {
//     //const OrderStatus = req.params.id2;
//     const OrderId= req.params.id1;

//     console.log("i am here")
//     const order = await Order.findOne({OrderId:OrderId});
//     order.OrderStatus = "Cancel Order";
//     const savedOrder = await order.save();
//     res.status(200).send(savedOrder);
   

// })

// mongo cancel order


// mongo
router.post("/orders/customer", checkAuth, async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("RestOrders", req.body  , function(err, results) {
       console.log("In result")
       console.log("result in msg", results)
       if(err){
           console.log("err", err)
           res.json({
               status: "Error",
               msg: "Error",
           })
           res.status(400).end();
       } else
       {
           console.log("inside else", results)
           res.status(200).send(results)
       }
   })
});

// router.post("/orders/customer/:id", async function (req, res) {
//     console.log("orders", typeof(req.body.DeliveryAddress))
//     console.log(req.body.Instructions)
//     //let orderId = uuidv4();
//     //let customerId = req.params.id;
//     let cart = req.body.cart;
//     //let Total = req.body.TotalAmt
    
//     //let addressId = req.body.addressId;
//     //let deliverytype = req.body.deliverytype;
//     //let restaurantId = req.body.restaurantId;
//     //orderId = uuidv4();
//     var dateString = new Date();
//     dateString1 = new Date(dateString).toLocaleString()
//     currentTimeStamp = dateString1.split(' ').slice(0, 5).join(' ');
  
//     let orderDetails = [];

//     cart.map(
//         item => {
//             orderDetails.push({
//                 DishName: item.DishName,
//                 DishDesc: item.DishDesc,
//                 Quantity: item.Quantity,
//                 Price: item.Price
//             });
//         }
//     );

//     let orderPayload = {
//         CustomerId: req.params.id,
//         RestaurantId: req.body.restaurantId,
//         OrderStatus: "Order Recieved",
//         DeliveryType: req.body.deliverytype,
//         CreatedAt: currentTimeStamp,
//         LastUpdatedTime: currentTimeStamp,
//         DeliveryAddress: req.body.DeliveryAddress,
//         OrderDetails: orderDetails,
//         Instructions: req.body.Instructions
//     }
//     const order = new Order({...orderPayload}); 
//     const savedOrder = await order.save()
//     res.status(200).send(savedOrder);
// });



// mongo


// mongo customer order might not work

router.get("/orders/customer/:id",checkAuth, async function (req, res) {
    const customerId = req.params.id;
    const order = await Order.findOne({CustomerId:customerId});
    res.status(200).send(order);
});

// mongo customer order might not work
// 

// router.get("/orders/:id/items", function (req, res) {
//     const orderId = req.params.id;
//     const query = "SELECT * from orderdetails as o INNER JOIN dishes as d on d.DishId = o.DishId where o.OrderId = ?";
//     //console.log(req);
//     con.query(query, [orderId], (err, results, fields) => {
//         console.log(err);
//         res.status(200).send(results);
//     });
// });

// mongo receipt orders

router.get("/orders/:id/items", checkAuth,async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("ReceiptOrder", req.params, function(err, results) {
       console.log("In result")
       console.log("result in msg", results)
       if(err){
           console.log("err", err)
           res.json({
               status: "Error",
               msg: "Error",
           })
           res.status(400).end();
       } else
       {
           console.log("inside else", results)
           res.status(200).send(results)
       }
   })
});


// router.get("/orders/:id/items", async function (req, res) {
//     const orderId = req.params.id;
//     const order = await Order.findOne({OrderId:orderId});
//     res.status(200).send(order.OrderDetails);
// });

// mongo receipt orders

module.exports = router;