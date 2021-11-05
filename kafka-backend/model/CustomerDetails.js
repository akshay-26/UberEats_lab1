const mongoose = require("mongoose");

const Address = new mongoose.Schema({
    
    AddressName: { type: String,required: true },
    AddressLine1: { type: String,required: true },
    AddressLine2: { type: String},
    City: { type: String,required: true },
    State: { type: String,required: true },
    Pincode: { type: String,required: true },
    Country: { type: String,required: true },
    _id: { type: String, auto:true },
});

const CustomerDetails = new mongoose.Schema({
    CustomerId: {type: mongoose.Types.ObjectId, auto: true},
    EmailId: {type: String, required: true},
    CustomerName: {type: String, required: true},
    CustomerPassword: {type: String, required: true},
    DoB: {type: String},
    PhoneNumber: {type: String},
    NickName: {type: String},
    AddressId:{type: String},
    Image: {type: String},
    Country: {type: String},
    City: {type: String},
    State: {type: String},
    ZipCode: {type: String},
    Favourites: [mongoose.Types.ObjectId],
    Address: [Address]
});





module.exports = mongoose.model("CustomerDetails", CustomerDetails);
