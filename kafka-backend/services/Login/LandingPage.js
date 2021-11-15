const mongoose = require("mongoose")
const Customer = require("../../model/CustomerDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const usermail = msg.useremail;
    const userpassword = msg.userpassword;

    try{
        const user = await Customer.findOne({EmailId: msg.useremail});
        if(!user){
            return res.status(400).send("User Does not Exist")
        }
        const isValid = await bcrypt.compare(userpassword, user.CustomerPassword)
        if(!isValid){
            callback(null, "Enter Valid Credentials")
        }
        else{
            const payload = {
               CustomerId : user.CustomerId,
                EmailId: user.EmailId,
                CustomerPassword: user.CustomerPassword
            }
        console.log(payload, secret);
        const token = await jwt.sign(payload, secret, {
            expiresIn: 1000000,
          });
        
          callback(null, { token: "jwt " + token });
        }
    }
    catch(err){
        console.log(err)
        callback(null, "Enter Valid Credentials");
    }
    }
}

exports.handle_request = handle_request;