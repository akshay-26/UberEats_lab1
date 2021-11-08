const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");
const Customer = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const mongoose = require('mongoose');
const kafka = require("../kafka/client")

router.post("/favourites/:id1/:id2", async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("PostFav", req.params, function(err, results) {
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

// router.post("/favourites/:id1/:id2", async function (req, res) {
//     console.log(req.params.id1, req.params.id2)
//     try{
//         const CustomerId = mongoose.Types.ObjectId(req.params.id1);
//     const RestaurantId = mongoose.Types.ObjectId(req.params.id2);
//     console.log(RestaurantId, CustomerId)
//     let customer = await Customer.findOne({ CustomerId: CustomerId });
//     if (!customer) {
//         return res.status(400).send("Customer not found");
//     }
//     customer.Favourites.push(RestaurantId);
//     updatedCustomer = await customer.save()
//     res.status(200).send(updatedCustomer);
// }catch (error) {
//     console.log(error);
//     res.status(400).send(error);
// }
    

// })

// router.post("/favourites1/:id1/:id2", function (req, res) {
//     const CustomerId = req.params.id1;
//     const RestaurantId = req.params.id2;
//     console.log(RestaurantId, CustomerId)

//     const query = "INSERT INTO Personalization (CustomerId, RestaurantId) VALUES(?, ?)"
//     con.query(query, [CustomerId, RestaurantId], (err, results, fields) => {
//         console.log(results, err, fields)
//         console.log("executed insert")
//         res.status(200).send(results)
//     })

// })

router.get("/favourites/:id", async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("GetFav", req.params, function(err, results) {
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

// router.get("/favourites/:id", async (req, res) => {
//     const CustomerId = req.params.id;
//     console.log(CustomerId);
//     let restId = [];
//     var count = 0;

//     let customer = await Customer.findOne({ CustomerId: CustomerId });
//     if (!customer) {
//         return res.status(400).send("Customer not found");
//     }
//     const restaurantIds = customer.Favourites.toObject();
//     const favourites = await Restaurant.find({RestaurantId: {$in: restaurantIds}});
//     res.status(200).send(favourites);
// })

// router.get("/favourites1/:id", (req, res) => {
//     const CustomerId = req.params.id;
//     console.log(CustomerId);
//     let restId = [];
//     var count = 0;

//     const query1 = "select * from restaurant where RestaurantId IN (select RestaurantId from Personalization where CustomerId = ?)"
//     con.query(query1, [CustomerId], (err, results, fields) => {
//         if (err) {
//             if(err.code ==='ER_DUP_ENTRY'){
//             console.log(results, "hello");
//             res.status(400).send({error:"Restaurant Already added as favourite"})
//             }
//         }
//         // restId = results;
//         else {
//             console.log("here", results)
//             res.status(200).send(results)
//         }
//     })
// })


module.exports = router;