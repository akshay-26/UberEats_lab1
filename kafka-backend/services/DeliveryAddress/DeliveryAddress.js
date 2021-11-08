const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Customer = require("../../model/CustomerDetails")
const Restaurant = require("../../model/RestaurantDetails")

async function handle_request(msg, callback){
    
    var res = {}
    console.log("msg type", msg)

    {
        const save = msg
        const payload = {
            AddressLine1 : msg.addressLine1,
            AddressLine2 :  msg.addressLine2,
            City : msg.city,
            State :  msg.state,
            Country : msg.country,
            Pincode : msg.pincode,
            AddressName : msg.addressName,
            
        }
        const customerId = msg.CustomerId;
       
        console.log(msg)
    
        let customer = await Customer.findOne({ CustomerId: customerId });
        if (!customer) {
            callback(null, "Customer not found");
        }
        let address = customer.Address.toObject().filter(addr => addr.AddressName === payload.AddressName);
        if (address.length) {
            callback(null, "address with same name already exists");
        }
        customer.Address.push(payload);
        let updatedCustomer = await customer.save();
        address = updatedCustomer.Address.toObject().filter(addr => addr.AddressName == payload.AddressName);
        console.log(address)
        callback(null, address[0])
        //return res.status(200).send(address[0]);
    }
}

exports.handle_request = handle_request;