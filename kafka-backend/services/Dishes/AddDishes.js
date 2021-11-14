const mongoose = require("mongoose")
const Order = require("../../model/Orders")
const Restaurant = require("../../model/RestaurantDetails")


async function handle_request(msg, callback){
    var res = {}
    console.log("msg type", msg)

    {
        console.log(msg)
    let {DishId, RestaurantId} = msg
    let payload = { 
         DishName :msg.name, 
         DishType: msg.type, 
         DishDesc : msg.dishdesc, 
         RestaurantId :msg.restaurantId, 
         DishCategory: msg.category, 
         Price: msg.price, 
         DishImage : msg.imageUrl
        }
    // const dishid = req.params.id;
    console.log("res", payload)

    let restaurant = await Restaurant.findOne({ RestaurantId: msg.restaurantId });
    console.log("restaurant", restaurant)
    if(!restaurant){
        callback(null,"Restaurant not found");
    }
    if (!DishId) {
        console.log("inside if", payload)
        payload.RestaurantId = msg.restaurantId;
        restaurant.Dishes.push(payload);
        let response = await restaurant.save();
        updatedRestaurant = response.toObject();
        delete updatedRestaurant.RestaurantPassword;
        callback(null, updatedRestaurant);
    }else{
        console.log("inside else")

        let dish = restaurant.Dishes.id(mongoose.Types.ObjectId(DishId));
        dish.set({...payload});
        console.log(dish)
        let response = await restaurant.save();
        updatedRestaurant = response.toObject();
        delete updatedRestaurant.RestaurantPassword;
        callback(null, updatedRestaurant);
    }
    }
}

exports.handle_request = handle_request;