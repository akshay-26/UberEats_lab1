const router = require("express").Router();
const uuid = require("uuid");
const con = require("../connections/Dbconnection")
const bcrypt = require("bcrypt");
const Customer = require("../model/CustomerDetails");
const Restaurant = require("../model/RestaurantDetails");

const jwt = require("jsonwebtoken");
const { auth } = require("../utils/passport");
// const secret = "hello";
auth();

const saltRounds = 10;

router.post("/RegisterUser", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.userpassword, saltRounds);
  
    const customer = new Customer({
      CustomerName: req.body.username,
      EmailId: req.body.useremail,
      CustomerPassword: hashPassword,
    });
  console.log("customer", customer)
    try {
      const emailExists = await Customer.findOne({ EmailId: req.body.useremail });
      console.log("email", emailExists)
      if (emailExists) {
        return res.status(400).send(emailExists);
      }
      const savedUser = await customer.save();
      if (savedUser) {
        const payload = {
          _id: customer._id,
          CustomerName: customer.CustomerName,
          EmailId: customer.EmailId,
        };
        console.log(payload);
        const token = await jwt.sign(payload, secret, {
          expiresIn: 1000000,
        });
        // console.log(token);
        // res.status(200).end(token);
        res.status(200).json({ token: "jwt " + token });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });


// router.post("/RegisterUser", async (req, res) => {
//     const username = req.body.username;
//     const useremail = req.body.useremail;
//     const userpassword = req.body.userpassword;
//     const Customerid = uuid.v1();
//     //console.log(Customerid, username, useremail, userpassword)

//     var users = {
//         "Customerid": Customerid,
//         "username": req.body.username,
//         "useremail": req.body.useremail,
//         "userpassword": req.body.userpassword
//     }
//     const query1 = "INSERT INTO Customer1(CustomerId, EmailId, CustomerName, CustomerPassword) VALUES ( ?, ?, ?, ?)";
//     encryptedPass = await bcrypt.hash(userpassword, 10);

//     con.query(query1, [Customerid, useremail, username, encryptedPass], (err, result, fields) => {
//         //console.log(err);
//         if(err){
//             if (err.code === 'ER_DUP_ENTRY') {
//                 console.log("error message")
//                 res.status(400).send({error:"Email Id is already registered"});
//             }else{
//                 res.status(500).send({error:'Unknow internal server error'});
//             }
//         }else{
//             res.send(result.data);
//         }
//     })
// })


router.post("/RegisterUser/Restaurant", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.userpassword, saltRounds);

  const restaurant = new Restaurant({
    RestaurantName: req.body.RestaurantName,
    RestaurantEmail: req.body.useremail,
    RestaurantPassword: hashPassword,
  });
console.log("restaurant", restaurant)
  try {
    const emailExists = await Restaurant.findOne({ RestaurantEmail: req.body.useremail });
    console.log("email", emailExists)
    if (emailExists) {
      return res.status(400).send(emailExists);
    }
    const savedUser = await restaurant.save();
    if (savedUser) {
      const payload = {
        _id: restaurant._id,
        RestaurantName: restaurant.RestaurantName,
        RestaurantEmail: restaurant.RestaurantEmail,
      };
      console.log(payload);
      const token = await jwt.sign(payload, secret, {
        expiresIn: 1000000,
      });
      // console.log(token);
      // res.status(200).end(token);
      res.status(200).json({ token: "jwt " + token });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post("/RegisterUser/Restaurant", async (req, res) => {
//     const username = req.body.RestaurantName;
//     const useremail = req.body.useremail;
//     const userpassword = req.body.userpassword;
//     const Restaurantid = uuid.v1();
//     console.log(Restaurantid, username, useremail, userpassword)

//     encryptedPass = await bcrypt.hash(userpassword, 10);

//     const query1 = "insert INTO restaurant(RestaurantId, RestaurantName,RestaurantEmail, RestaurantPassword) VALUES ( ?, ?, ?, ?)";
//     con.query(query1, [Restaurantid, username, useremail, encryptedPass], (err, result, fields) => {
//         // if (err) {
//         //     console.log(err);
//         //     if (err.code === 'ER_DUP_ENTRY') {
//         //         res.status(400).send({ error: "Email Id is already registered" });
//         //     } else {
//         //         res.status(500).send({ error: 'Unknow internal server error' });
//         //     }
//         // } else {
//             console.log("result", result)
//             console.log("err", err)
//             console.log("fields", fields)
//             console.log("suharsh ")


//             res.status(200).send({Restaurantid:Restaurantid});
//         // }

//     }
//     )
// })

module.exports = router;