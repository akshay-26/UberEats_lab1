const router = require("express").Router();
//const dbpool = require();
const bcrypt = require("bcrypt")
const con = require("../connections/Dbconnection")

router.post("/LandingPage", (req, res) => {

    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    console.log(useremail, userpassword)

    con.query("SELECT * FROM Customer1 where EmailId = ? ", [useremail], async (err, result, fields) => {
        console.log(err);
        console.log("hi", userpassword);
        const salt = await bcrypt.genSalt(15)
        const newHashedPassword = await bcrypt.hash(result[0].CustomerPassword, salt)
        const isValid = await bcrypt.compare(
            userpassword, newHashedPassword
        );
        console.log(isValid);
        if(isValid){
            res.status(200).send({message: "Auth success"})
        }
        else{
            res.status(400).send({message:"invalid credentials"})
        }
    })
  
})

module.exports = router;