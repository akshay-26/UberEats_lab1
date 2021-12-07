const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
        
        AddressName: { type: String,required: true },
        AddressLine1: { type: String,required: true },
        AddressLine2: { type: String},
        City: { type: String,required: true },
        State: { type: String,required: true },
        Pincode: { type: String,required: true },
        Country: { type: String,required: true },
        _id: { type: String, auto:true }
});

const ordersSchema = new Schema({
        OrderId: { type: mongoose.Schema.Types.ObjectId, auto: true },
        CustomerId: { type: String, required: true },
        CustomerName: { type: String },
        RestaurantName:{type: String},
        ImageUrl: { type: String },
        RestaurantId: { type: String, required: true },
        OrderStatus: { type: String, required: true },
        DeliveryType: { type: String, required: true },
        CreatedAt: { type: String, required: true },
        LastUpdatedTime: { type: String, required: true },
        DeliveryAddress:[Address],
        OrderDetails: [{
            DishName: { type: String, required: true },
            DishDesc: { type: String, required: true },
            Quantity: { type: Number, required: true },
            Price: { type: Number, required: true }
        }],
        Instructions: {type: String}
})

module.exports = mongoose.model("ordersSchema", ordersSchema);
