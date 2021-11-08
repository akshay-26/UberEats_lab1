
const router = require("express").Router();
const con = require('../connections/Dbconnection')
const { v4: uuidv4 } = require('uuid');
const { stat } = require("fs");
const Customer = require("../model/CustomerDetails")
const kafka = require("../kafka/client")
//mongo

router.post("/deliveryAddress/customer", async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("DeliveryAddress", req.body, function(err, results) {
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

// router.post("/deliveryAddress/customer", async function (req, res) {

//     const save = req.body
//     const payload = {
//         AddressLine1 : req.body.addressLine1,
//         AddressLine2 :  req.body.addressLine2,
//         City : req.body.city,
//         State :  req.body.state,
//         Country : req.body.country,
//         Pincode : req.body.pincode,
//         AddressName : req.body.addressName,
        
//     }
//     const customerId = req.body.CustomerId;
//     const addressId = uuidv4();
//     console.log(req.body)

//     let customer = await Customer.findOne({ CustomerId: customerId });
//     if (!customer) {
//         return res.status(400).send("Customer not found");
//     }
//     let address = customer.Address.toObject().filter(addr => addr.AddressName === payload.AddressName);
//     if (address.length) {
//         return res.status(400).send({ "message": "address with same name already exists" });
//     }
//     customer.Address.push(payload);
//     let updatedCustomer = await customer.save();
//     address = updatedCustomer.Address.toObject().filter(addr => addr.AddressName == payload.AddressName);
//     console.log(address)
//     return res.status(200).send(address[0]);
// });

//mongo





//mongo
router.get("/deliveryAddress/customer/:id", async function (req, res) {
    //const CustomerId = req.params.id;
   kafka.make_request("GetDeliveryAddress", req.params, function(err, results) {
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


// router.get("/deliveryAddress/customer/:id", async function (req, res) {
//     const customerId = req.params.id;
//     console.log(customerId)
//     let customer = await Customer.findOne({CustomerId:customerId});
//     if (!customer) {
//         return res.status(400).send("Customer not found");
//     }
//     const deliveryAddress = customer.Address || [];
//     if (deliveryAddress) {
//         return res.status(200).send(deliveryAddress);
//     }
// });
// mongo

module.exports = router;