
const router = require("express").Router();
const con = require('../connections/Dbconnection')
const { v4: uuidv4 } = require('uuid');
const { stat } = require("fs");
const Customer = require("../model/CustomerDetails")
//mongo
router.post("/deliveryAddress/customer/:id", async function (req, res) {

    const save = req.body
    const payload = {
        AddressLine1 : req.body.addressLine1,
        AddressLine2 :  req.body.addressLine2,
        City : req.body.city,
        State :  req.body.state,
        Country : req.body.country,
        Pincode : req.body.pincode,
        AddressName : req.body.addressName,
        
    }
    const customerId = req.params.id;
    const addressId = uuidv4();
    console.log(req.body)

    let customer = await Customer.findOne({ CustomerId: customerId });
    if (!customer) {
        return res.status(400).send("Customer not found");
    }
    let address = customer.Address.toObject().filter(addr => addr.AddressName === payload.AddressName);
    if (address.length) {
        return res.status(400).send({ "message": "address with same name already exists" });
    }
    customer.Address.push(payload);
    let updatedCustomer = await customer.save();
    address = updatedCustomer.Address.toObject().filter(addr => addr.AddressName == payload.AddressName);
    console.log(address)
    return res.status(200).send(address[0]);
});

//mongo

// router.post("/deliveryAddress1/customer/:id", function (req, resp) {

//     const { addressLine1, addressLine2, city, state, country, pincode, addressName, save } = req.body;
//     const customerId = req.params.id;
//     const addressId = uuidv4();
//     console.log(req.body)

//     const query = "INSERT INTO address(AddressId,Address1,Address2,City,State,PinCode,Country) VALUES(?,?,?,?,?,?,?)";
//     con.query(query, [addressId, addressLine1, addressLine2, city, state, country, pincode], async (err, results, fields) => {
//         if (err) {
//             console.log(err);
//             resp.status(500).send({ error: 'Unknown internal server error' });
//         } else {
//             if (save) {
//                 const query = "INSERT INTO deliveryaddress(CustomerId,AddressId,SavaAsName) VALUES(?,?,?)";
//                 con.query(query, [customerId, addressId, addressName], async (err, results, fields) => {
//                     if (err) {
//                         console.log(err);
//                         resp.status(500).send({ error: 'Unknown internal server error' });
//                     } else {
//                         resp.send({ AddressId: addressId });
//                     }
//                 });
//             } else {
//                 resp.send({ AddressId: addressId });
//             }
//         }
//     })
// });

// router.get("/deliveryAddress/customer/:id", function (req, res) {
//     const customerId = req.params.id;
//     console.log(customerId)
//     const query = "SELECT * FROM address as a INNER JOIN deliveryaddress as d on a.AddressId = d.AddressId where d.CustomerId = ?";
//     con.query(query, [customerId], (err, results, fields) => {
//         res.status(200).send(results);

//         if (err) {
//             console.log(err)
//         }
//     })
// });


//mongo
router.get("/deliveryAddress/customer/:id", async function (req, res) {
    const customerId = req.params.id;
    console.log(customerId)
    let customer = await Customer.findOne({CustomerId:customerId});
    if (!customer) {
        return res.status(400).send("Customer not found");
    }
    const deliveryAddress = customer.Address || [];
    if (deliveryAddress) {
        return res.status(200).send(deliveryAddress);
    }
});
// mongo

module.exports = router;