const router = require("express").Router();
const con = require("../connections/Dbconnection")
const Restaurant = require("../model/RestaurantDetails")
const Customer = require("../model/CustomerDetails")
const mongoose = require("mongoose");
const { checkAuth } = require("../utils/passport");
const kafka = require("../kafka/client")
// router.get("/UserProfile/User", (req, res) => {
//   const email = req.query.email;
//   console.log("my email", req)
//   var userquery = "SELECT * from Customer1 where EmailId=?";
//   con.query(userquery, [email], (err, result, fields) => {
//     if (err) throw err;
//     res.send(result);  //   res.status(200).json({
//     //     email: result[0].EmailId,
//     //     fullname: result[0].CustomerName,
//     //     phonenumber: result[0].PhoneNumber,

//     // })
//   })
// })
router.get("/UserProfile/User", async function (req, res) {
  //const CustomerId = req.params.id;
 kafka.make_request("GetUser", req.query, function(err, results) {
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


// router.get("/UserProfile/User", checkAuth, async (req, res) =>{
//   const email = req.query.email;
//   const customer = await Customer.findOne({EmailId:email});
//     res.status(200).send(customer);
// })
router.post("/UserProfile", async function (req, res) {
  //const CustomerId = req.params.id;
 kafka.make_request("PostUser", req.body, function(err, results) {
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

// router.post("/UserProfile", async (req, res) => {
    
//   const customerId = mongoose.Types.ObjectId(req.body.CustomerId);
//   console.log("customerId", customerId )
//   let customer = await Customer.findOne({CustomerId:customerId});
//   if (!customer) {
//       return res.status(400).send("Customer not found");
//   }

//   payload = {
     
//        CustomerName : req.body.fullname,
//        NickName : req.body.nickname,
//        PhoneNumber : req.body.phonenumber,
//        City : req.body.city,
//        State : req.body.state,
//        ZipCode : req.body.zipcode,
//        Image : req.body.url1,
//        Country : req.body.country
//   }

//   Customer.findOneAndUpdate({ CustomerId: customerId }, payload,{returnNewDocument:true}, function (err, updateCustomer) {
//       if (err) return res.send(500, { error: err });
//       return res.status(200).send(updateCustomer);
//   });
// });

// router.post("/UserProfile", function (req, res) {
//   // console.l("In profile update");
//   console.log("request", req.body.imageUrl);
//   const emailId = req.body.email;
//   const emailUpdate = req.body.email;
//   const fullnameUpdate = req.body.fullname;
//   const nickname = req.body.nickname
//   const phonenumberUpdate = req.body.phonenumber;
//   const cityUpdate = req.body.city;
//   const state = req.body.state;
//   const zipcodeUpdate = req.body.zipcode;
//   const imageURL = req.body.url1;
//   const country = req.body.country
  
//   console.log("URL", imageURL)

//   con.query("update Customer1 set image=? where EmailId=?", [imageURL, emailId], (err, result) => {
//     if (err) throw console.err;
//   });

//   console.log(cityUpdate, phonenumberUpdate)
//   if (fullnameUpdate !== "") {
//     const updateAlias = "update Customer1 set CustomerName=? where EmailId=?";
//     con.query(updateAlias, [fullnameUpdate, emailId], (err, result) => {
//       if (err) throw err;
//         console.log(result);

//     });
//   }

//   if (nickname !== "") {
//     const updateAlias = "update Customer1 set NickName=? where EmailId=?";
//     con.query(updateAlias, [nickname, emailId], (err, result) => {
//       if (err) throw err;
//       //console.log(result);

//     });
//   }

//   if (phonenumberUpdate !== "") {
//     const updateAlias = "update Customer1 set PhoneNumber=? where EmailId=?";
//     con.query(updateAlias, [phonenumberUpdate, emailId], (err, result) => {
//       if (err) throw err;

//       // console.l(result);
//     });
//   }
//   if (cityUpdate !== "") {
//     console.log("i am in city")
//     const getCustomerId = "update Customer1 set City=? where EmailId=?";
//     var result1 = con.query(getCustomerId, [cityUpdate, emailId], (err, result) => {
//         console.log(err)
        
//       })
//     }



//     if (country !== "") {
//       const updateAlias = "update Customer1 set Country=? where EmailId=?";
//       con.query(updateAlias, [country, emailId], (err, result) => {
//         if (err) throw err;
//         // console.l(result);
//       });
//     }
//     if (zipcodeUpdate !== "") {
//       const updateAlias = "update Customer1 set ZipCode=? where EmailId=?";
//       con.query(updateAlias, [zipcodeUpdate, emailId], (err, result) => {
//         if (err) throw err;
//         // console.l(result);
//       });
//     }

//     if (state !== "") {
//       const updateAlias = "update Customer1 set State=? where EmailId=?";
//       con.query(updateAlias, [state, emailId], (err, result) => {
//         if (err) throw err;
//         // console.l(result);
//       });
//     }

//     res.status(200).json({ message: "Updation Successful" });
//   });


//   router.get("/restaurant/:id",(req,resp)=>{
    
//     const restaurantId = req.params.id;
//     let query = "SELECT * from restaurant where RestaurantId = ?";
//     con.query(query,[restaurantId],function(err,results, fields){
//         if(err){
//             resp.status(500).send({error:'Unknow internal server error'});
//         }else{
//             resp.status(200).send(results[0]);
//         }
//     });
// });

router.get("/restaurant/:id", async function (req, res) {
  //const CustomerId = req.params.id;
 kafka.make_request("GetRestaurantProfile", req.params, function(err, results) {
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

// router.get("/restaurant/:id", checkAuth, async(req,res)=>{
// const restaurantId = req.params.id;
// const restaurant = await Restaurant.findOne({RestaurantId:restaurantId});
//     res.status(200).send(restaurant);
// })


router.get("/customer/:id", async (req,res)=>{
    
    const CustomerId = req.params.id;
   // const restaurantId = msg.id;
    const customer = await Customer.findOne({CustomerId:CustomerId});
    res.status(200).send(customer);
  });
  

// router.get("/customer/:id",(req,resp)=>{
    
//   const CustomerId = req.params.id;
//   let query = "SELECT * from Customer1 where CustomerId = ?";
//   con.query(query,[CustomerId],function(err,results, fields){
//       if(err){
//           resp.status(500).send({error:'Unknow internal server error'});
//       }else{
//         console.log(results)
//           resp.status(200).send(results);
//       }
//   });
// });

// router.post("/restaurant/:id",async(req,resp)=>{
//   restaurantId = req.params.id;
//   restaurantName = req.body.name;
//   restaurantId = req.params.id;
//   country = req.body.country;
//   state = req.body.state;
//   city = req.body.city;
//   pincode = req.body.pincode;
//   fromHrs = req.body.fromHrs;
//   toHrs = req.body.toHrs;
//   phone = req.body.phone;
//   desc = req.body.desc;
//   mode = req.body.mode;
//   imageUrl = req.body.imageUrl;

//   let query = "UPDATE restaurant SET RestaurantName = ?, RestaurantDesc = ?, Country = ?, City = ?, State = ?, PhoneNumber = ?,Pincode = ?, WorkHrsFrom = ? , WorkHrsTo = ?, DeliveryMode= ?, Image = ? where RestaurantId = ?";
//   con.query(query,[restaurantName,desc,country,city,state,phone,pincode,fromHrs,toHrs,mode, imageUrl,restaurantId],function(err,results, fields){
//       if(err){
//         console.log(err)
//           resp.status(500).send({error:'Unknow internal server error'});

//       }else{
//           resp.send({message : "updated"});
//       }
//   });
// });
router.post("/restaurant/profile", async function (req, res) {
  //const CustomerId = req.params.id;
 kafka.make_request("PostRestaurant", req.body, function(err, results) {
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

// router.post("/restaurant/profile",async(req,res)=>{
//   const restaurantId = mongoose.Types.ObjectId(req.params.id);
//   let restaurant = await Restaurant.findOne({RestaurantId:restaurantId});
//   if (!restaurant) {
//       return res.status(400).send("Restaurant not found");
//   }

//   payload = {
//       RestaurantName:req.body.name,
//       RestaurantDesc: req.body.desc ,
//       PhoneNumber:req.body.phone ,
//       DeliveryMode: req.body.mode,
//       Country: req.body.country,
//       State: req.body.state,
//       City: req.body.city,
//       PinCode: req.body.pincode,
//       Image: req.body.imageUrl,
//       WorkHrsFrom: req.body.fromHrs,
//       WorkHrsTo: req.body.toHrs
//   }

//   Restaurant.findOneAndUpdate({ RestaurantId: restaurantId }, payload,{returnNewDocument:true}, function (err, updateRestaurant) {
//       if (err) return res.send(500, { error: err });
//       return res.status(200).send(updateRestaurant);
//   });
// })

module.exports = router;