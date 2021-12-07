const router = require('express').Router();
// const dbpool = require();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const con = require('../connections/Dbconnection');
const Customer = require('../model/CustomerDetails');
const Restaurant = require('../model/RestaurantDetails');
const { secret } = require('../Config');
const { auth } = require('../utils/passport');
// const secret = "hello";
auth();
const saltRounds = 10;

router.post('/LandingPage', async (req, res) => {
  const usermail = req.body.useremail;
  const { userpassword } = req.body;

  // const customer = new Customer ({
  //     EmailId: req.body.useremail,
  //     CustomerPassword: req.body.userpassword
  // })
  try {
    const user = await Customer.findOne({ EmailId: req.body.useremail });
    if (!user) {
      return res.status(400).send('User Does not Exist');
    }
    const isValid = await bcrypt.compare(userpassword, user.CustomerPassword);
    if (!isValid) {
      res.status(400).send('Enter Valid Credentials');
    } else {
      const payload = {
        CustomerId: user.CustomerId,
        EmailId: user.EmailId,
        CustomerPassword: user.CustomerPassword,
      };
      console.log(payload, secret);
      const token = await jwt.sign(payload, secret, {
        expiresIn: 1000000,
      });

      res.status(200).json({ token: `jwt ${token}` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Enter Valid Credentials');
  }
});

// router.post("/LandingPage", (req, res) => {

//     const useremail = req.body.useremail;
//     const userpassword = req.body.userpassword;
//     //console.log(useremail, userpassword)

//     con.query("SELECT * FROM Customer1 where EmailId = ? ", [useremail], async (err, result, fields) => {
//         const salt = await bcrypt.genSalt(15)
//        if(result.length == 0){
//            res.status(400).send({message: "User does not Exist"})
//        }
//        else{
//         const isValid = await bcrypt.compare(userpassword, result[0]["CustomerPassword"])
//         if (isValid) {
//             //console.log("valid")
//             res.status(200).send(result)
//         }
//         else {
//             //console.log("Invalid")
//             res.status(400).send({ message: "Invalid Credentials" })
//         }
//     }
//     })
// })

// router.post("/RestaurantUser",  (req, res) => {

//     const useremail = req.body.useremail;
//     const userpassword = req.body.userpassword;
//      //console.log(useremail, userpassword)

//     con.query("SELECT * FROM restaurant where RestaurantEmail = ? ", [useremail], async (err, result, fields) => {

//        // console.log(result);
//        // console.log("hi 123 ", userpassword);
//        // const salt = await bcrypt.genSalt(15)
//         //const newHashedPassword = bcrypt.hash(result[0].RestaurantPassword, salt)
//         //console.log( result[0].RestaurantPassword)
//         //console.log("hahaha");
//         const isValid = await bcrypt.compare(userpassword, result[0]["RestaurantPassword"])

//         if (isValid) {
//             let results = {
//                 id: result[0].RestaurantId,
//                 email: result[0].RestaurantEmail,
//                 name: result[0].RestaurantName,
//                 desc: result[0].RestaurantDesc,
//                 phone: result[0].PhoneNumber,
//                 fromHrs: result[0].WorkHrsFrom,
//                 toHrs: result[0].WorkHrsTo,
//                 image: result[0].Image,
//                 addressId: result[0].AddressId
//             }
//             //console.log("suceeesss");
//             res.status(200).send(result)
//         }
//         else {
//             //console.log("Invalid")
//             res.status(400).send({ message: "Invalid Credentials" })
//         }

//     })

// })

router.post('/RestaurantUser', async (req, res) => {
  const usermail = req.body.useremail;
  const { userpassword } = req.body;

  // const customer = new Customer ({
  //     EmailId: req.body.useremail,
  //     CustomerPassword: req.body.userpassword
  // })
  try {
    const user = await Restaurant.findOne({ RestaurantEmail: req.body.useremail });
    console.log(user);
    if (!user) {
      return res.status(400).send('User Does not Exist');
    }
    const isValid = await bcrypt.compare(userpassword, user.RestaurantPassword);
    if (!isValid) {
      res.status(400).send('Enter Valid Credentials');
    } else {
      const payload = {
        RestaurantId: user.RestaurantId,
        RestaurantEmail: user.RestaurantEmail,
        RestaurantPassword: user.RestaurantPassword,
      };
      console.log(payload);
      const token = await jwt.sign(payload, secret, {
        expiresIn: 1000000,
      });

      res.status(200).json({ token: `JWT ${token}` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Enter Valid Credentials');
  }
});

module.exports = router;
