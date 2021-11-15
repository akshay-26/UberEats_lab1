const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const { v4: uuidv4 } = require('uuid');
const Restaurant = require("../model/RestaurantDetails")
const mongoose = require('mongoose');
const kafka = require("../kafka/client")
// mongo
const { checkAuth } = require("../utils/passport");
// router.get("/Restaurant/dishes/:id", async function (req, res) {
//     const restaurantId = req.params.id;
//     let restaurant = await Restaurant.findOne({ RestaurantId: req.params.id });
//     res.status(200).send(restaurant.Dishes);
// });
router.get("/Restaurant/dishes/:id", checkAuth, async function (req, res) {
   
    kafka.make_request("GetRestDishes", req.params, function(err, results) {
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


// mongo
router.post("/restaurant/Add/dishes", checkAuth, async function (req, res) {
   
   kafka.make_request("AddDishes", req.body, function(err, results) {
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


// router.post("/restaurant/Add/dishes", async (req, res) => {
//     console.log(req.body)
//     let {DishId, RestaurantId} = req.body
//     let payload = { 
//          DishName :req.body.name, 
//          DishType: req.body.type, 
//          DishDesc : req.body.dishdesc, 
//          RestaurantId :req.body.restaurantId, 
//          DishCategory: req.body.category, 
//          Price: req.body.price, 
//          DishImage : req.body.imageUrl
//         }
//     // const dishid = req.params.id;
//     console.log("res", payload)

//     let restaurant = await Restaurant.findOne({ RestaurantId: req.body.restaurantId });
//     console.log("restaurant", restaurant)
//     if(!restaurant){
//         res.status(400).send({"message":"Restaurant not found"});
//     }
//     if (!DishId) {
//         console.log("inside if", payload)
//         payload.RestaurantId = RestaurantId;
//         restaurant.Dishes.push(payload);
//         let response = await restaurant.save();
//         updatedRestaurant = response.toObject();
//         delete updatedRestaurant.RestaurantPassword;
//         res.status(200).send(updatedRestaurant);
//     }else{
//         console.log("inside else")

//         let dish = restaurant.Dishes.id(mongoose.Types.ObjectId(DishId));
//         dish.set({...payload});
//         console.log(dish)
//         let response = await restaurant.save();
//         updatedRestaurant = response.toObject();
//         delete updatedRestaurant.RestaurantPassword;
//         res.status(200).send(updatedRestaurant);
//     }

   
// })

// mongo


// router.get("/dishes/:id", function (req, res) {
//     const dishId = req.params.id;
//     const query = "SELECT * FROM dishes where DishId = ?";
//     con.query(query, [dishId], (err, results, fields) => {
//         if (err) {
//             res.status(500).send({ message: "Entry does not exist" })
//         }
//         else {
//             console.log(results)
//             res.status(200).send(results[0]);
//         }
//     })

// });

router.get("/dishes/:id",checkAuth, async function (req, res) {
   
    kafka.make_request("GetDishes", req.params, function(err, results) {
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

// router.get("/dishes/:id", async function(req, res) {
//     const dishId = req.params.id;
//     let dishes = await Restaurant.findOne({RestaurantId:dishId})
//     res.status(200).send(dishes.Dishes);
// })

// mongo

router.get("/dishes/:id/:id1", checkAuth, async function (req, res) {
   
    kafka.make_request("GetOneDish", req.params, function(err, results) {
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

// router.get("/dishes/:id/:id1", async function (req, res) {
//     const dishId = req.params.id;
//     const RestaurantId = req.params.id1;
    
//     let restaurant = await Restaurant.findOne({ RestaurantId: RestaurantId });
//     res.status(200).send(restaurant.Dishes.id(dishId));

// });

// mongo



// mongo

router.get("/Alldishes", checkAuth, async function (req, res) {
   
    kafka.make_request("GetAllDish", req.params, function(err, results) {
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


// router.get("/Alldishes",  async function (req, res) {
//     const dishId = req.params.id;
//     const restaurants = await Restaurant.find();
//     let dishes = [];
//     restaurants.map(restaurant => dishes.push(...restaurant.Dishes));
//     res.status(200).send(dishes);

// });


// mongo
// router.get("/Alldishes", function (req, res) {
//     const dishId = req.params.id;
//     const query = "Select * FROM restaurant as r INNER JOIN dishes as d on r.restaurantId = d.restaurantId ";
//     con.query(query, (err, results, fields) => {
//         if (err) {
//             res.status(500).send({ message: "Entry does not exist" })
//         }
//         else {
//             console.log(results)
//             res.status(200).send(results);
//         }
//     })

// });
module.exports = router;
