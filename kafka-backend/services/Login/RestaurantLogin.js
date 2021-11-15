const mongoose = require("mongoose")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const usermail = req.body.useremail;
        const userpassword = req.body.userpassword;
    
        // const customer = new Customer ({
        //     EmailId: req.body.useremail,
        //     CustomerPassword: req.body.userpassword
        // })
        try{
            const user = await Restaurant.findOne({RestaurantEmail: req.body.useremail});
            console.log(user)
            if(!user){
                callback(null, "User Does not Exist")
            }
            const isValid = await bcrypt.compare(userpassword, user.RestaurantPassword)
            if(!isValid){
                callback(null, "Enter Valid Credentials")
            }
            else{
                const payload = {
                    RestaurantId : user.RestaurantId,
                    RestaurantEmail: user.RestaurantEmail,
                    RestaurantPassword: user.RestaurantPassword
                }
            console.log(payload);
            const token = await jwt.sign(payload, secret, {
                expiresIn: 1000000,
              });
           
              callback(null, { token: "JWT " + token });
            }
        }
        catch(err){
            console.log(err)
           callback(null, "Enter Valid Credentials");
        }
    }
}

exports.handle_request = handle_request;