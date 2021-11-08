const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")
const Customer = require("../../model/CustomerDetails")
async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        const customerId = mongoose.Types.ObjectId(msg.CustomerId);
  console.log("customerId", customerId )
  let customer = await Customer.findOne({CustomerId:customerId});
  if (!customer) {
      callback(null,"Customer not found");
  }

  payload = {
     
       CustomerName : msg.fullname,
       NickName : msg.nickname,
       PhoneNumber : msg.phonenumber,
       City : msg.city,
       State : msg.state,
       ZipCode : msg.zipcode,
       Image : msg.url1,
       Country : msg.country
  }

  Customer.findOneAndUpdate({ CustomerId: customerId }, payload,{returnNewDocument:true}, function (err, updateCustomer) {
      if (err) callback(null, err );
      callback(null,updateCustomer);
  });
    }
}

exports.handle_request = handle_request;