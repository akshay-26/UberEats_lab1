const router = require("express").Router();
//const dbpool = require();
//const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")
const Restaurant = require("../model/RestaurantDetails")
const kafka = require("../kafka/client")
const { checkAuth } = require("../utils/passport");
// router.get("/Restaurants", (req, res) => {

//     const country = req.query.country;
//     const city = req.query.city;
//     console.log(req.query, typeof(country));
//     let queryCondition='';
//     if(country!='null' && country.length)
//       queryCondition = queryCondition + " where Country = ? ";
//     if(city!='null' && city.length)
//       queryCondition = queryCondition + "and City = ?";
//     const query = "Select * FROM restaurant" + queryCondition;

//     console.log(query)

//     con.query(query,[country,city], (err, result, fields) => {
//         console.log(err);
//         console.log(result, fields)
//         res.send(result);
//     })
  
// })

//mongo


router.get("/Restaurants", checkAuth, async (req, res) => {

    const query = {};
    const country = req.query.country;
    const city = req.query.city;
    console.log(req.query, typeof(country));
    let queryCondition='';
    if(country!='null' && country.length)
      query.Country = country;
    if(city!='null' && city.length)
      query.City = city
  
    const restaurants = await Restaurant.find(query);
    res.status(200).send(restaurants);
  
})

// mongo

// router.get("/Restaurant",function(req,resp){
//     const query = "select * from restaurant";
//     con.query(query, (err,results,fields)=>{
//         resp.status(200).send(results);
//     });
// });

// mongo
router.get("/Restaurant", checkAuth, async function (req, res) {
  const CustomerId = req.params.id;
 kafka.make_request("GetRestaurant", req.params, function(err, results) {
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

router.get("/Restaurant", checkAuth, async function(req,res){
    const restaurants = await Restaurant.find();
    res.status(200).send(restaurants);
});


// mongo

// router.get("/dishes", (req, res) =>{
//     const name = req.query.name;
//     const query = "select * from dishes where RestaurantId = ?";
//     con.query(query, [RestaurantId], (err, result, fields) =>{
//         res.status(200).send(result);
//     })
// })


// mongo

router.get("/dishes",  checkAuth, async (req, res) =>{
    const name = req.query.name;
    const id = req.params.id;
    const restaurants = await Restaurant.find({RestaurantId:id});
    res.status(200).send(restaurants);
})


// mongo
module.exports = router;