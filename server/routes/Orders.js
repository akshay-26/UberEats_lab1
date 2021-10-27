const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');
const Order = require("../model/Orders")

// router.get("/Orders/:id", function (req, res) {
//     const CustomerId = req.params.id;
//     const query = "SELECT * FROM orders where CustomerId = ?";

//     const query1 = "select * from orders inner join restaurant on orders.RestaurantId = restaurant.RestaurantId where CustomerId = ?" ;

//     con.query(query1, [CustomerId], (err, results, fields) => {
//         res.status(200).send(results);

//     });
// });

// mongo

router.get("/Orders/:id", async function (req, res) {
    const CustomerId = req.params.id;
    const order = await Order.find({CustomerId:CustomerId});
    res.status(200).send(order);
});

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

router.get("/restaurant/Orders/:id", async function (req, res) {
    const RestaurantId = req.params.id;
    const orders = await Order.find({RestaurantId:RestaurantId});
    res.status(200).send(orders);
});

//mongo

// router.post("/restaurant/Orders/:id1/:id2", function (req, res) {
//     const OrderStatus = req.params.id2;
//     const OrderId= req.params.id1;

//     console.log("i am here")

//     const query= "update orders set OrderStatus = ? where OrderId = ?"

//     con.query(query, [OrderStatus, OrderId], (err, results, fields) =>{
//        if(err){
//            console.log(err)
//        } 
//        else{
//            res.status(200).send(results)
//        }
//     })
// })

// mongo /restaurant/Orders/:id1/:id2

router.post("/restaurant/Orders/:id1/:id2", async function (req, res) {
    const OrderStatus = req.params.id2;
    const OrderId= req.params.id1;

    console.log("i am here")

    const order = await Order.findOne({OrderId:OrderId});
    order.OrderStatus = OrderStatus;
    const savedOrder = await order.save();
    res.status(200).send(savedOrder);
   
})

// mongo /restaurant/Orders/:id1/:id2

// router.post("/restaurant/CancelOrders/:id1", function (req, res) {
//     //const OrderStatus = req.params.id2;
//     const OrderId= req.params.id1;

//     console.log("i am here")

//     const query= "update orders set OrderStatus =? where OrderId = ?"

//     con.query(query, ["Cancel Order", OrderId], (err, results, fields) =>{
//        if(err){
//            console.log(err)
//        } 
//        else{
//            res.status(200).send(results)
//        }
//     })
// })


// mongo cancel order

router.post("/restaurant/CancelOrders/:id1", async function (req, res) {
    //const OrderStatus = req.params.id2;
    const OrderId= req.params.id1;

    console.log("i am here")
    const order = await Order.findOne({OrderId:OrderId});
    order.OrderStatus = "Cancel Order";
    const savedOrder = await order.save();
    res.status(200).send(savedOrder);
   

})

// mongo cancel order


// router.post("/orders/customer/:id", function (req, resp) {
//     let orderId = uuidv4();
//     let customerId = req.params.id;
//     let cart = req.body.cart;
//     let Total = req.body.TotalAmt
//     console.log(Total)
//     let addressId = req.body.addressId;
//     let deliverytype = req.body.deliverytype;
//     let restaurantId = req.body.restaurantId;
//     orderId = uuidv4();
//     currentTimeStamp = new Date();

//     const orderQuery = "INSERT INTO orders (OrderId, CustomerId, RestaurantId, OrderStatus, DeliveryType, CreatedAt, LastUpdatedTime, TotalAmount, DeliveryAddressId) VALUES (?,?,?,?,?,?,?,?,?)";
//     con.query(orderQuery, [orderId,customerId,restaurantId,"Order Received",deliverytype,currentTimeStamp,currentTimeStamp,Total, addressId], (err, results, fields) => {
//         if (err) {
//             console.log(err)
//             resp.status(500).send({ error: 'Unknown internal server error' });
//         } else {
//             let orderDetails = [];
//             cart.map(
//                 item => {
//                     orderDetails.push([
//                         orderId,
//                         item.DishId,
//                         item.Quantity
//                     ]);
//                 }
//             );
//             const detailsQuery = "INSERT INTO orderdetails (OrderId, DishId, Quantity) VALUES ?";
//             con.query(detailsQuery, [orderDetails], (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     resp.status(500).send({ error: 'Unknown internal server error' });
//                 } else {
//                     resp.send({orderId: orderId });
//                 }
//             });

//         }
//     });
// });

// mongo

router.post("/orders/customer/:id", async function (req, res) {
    console.log("orders", typeof(req.body.DeliveryAddress))
    console.log(typeof(Order.DeliveryAddress))
    //let orderId = uuidv4();
    //let customerId = req.params.id;
    let cart = req.body.cart;
    //let Total = req.body.TotalAmt
    
    //let addressId = req.body.addressId;
    //let deliverytype = req.body.deliverytype;
    //let restaurantId = req.body.restaurantId;
    //orderId = uuidv4();
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
        CustomerId: req.params.id,
        RestaurantId: req.body.restaurantId,
        OrderStatus: "Order Recieved",
        DeliveryType: req.body.deliverytype,
        CreatedAt: currentTimeStamp,
        LastUpdatedTime: currentTimeStamp,
        DeliveryAddress: req.body.DeliveryAddress,
        OrderDetails: orderDetails
    }
    const order = new Order({...orderPayload}); 
    const savedOrder = await order.save()
    res.status(200).send(savedOrder);
});



// mongo


router.get("/orders/customer/:id", function (req, res) {
    const customerId = req.params.id;
    const query = "SELECT * FROM address as a INNER JOIN orders as o INNER JOIN restaurant as r on r.RestaurantId = o.RestaurantId and o.DeliveryAddressId = a.AddressId where o.CustomerId = ?";
    //console.log(req);
    con.query(query, [customerId], (err, results, fields) => {
        console.log(err);
        res.status(200).send(results);
    });
});

// mongo customer order might not work

router.get("/orders/customer/:id", async function (req, res) {
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

router.get("/orders/:id/items", async function (req, res) {
    const orderId = req.params.id;
    const order = await Order.findOne({OrderId:orderId});
    res.status(200).send(order.OrderDetails);
});

// mongo receipt orders

module.exports = router;