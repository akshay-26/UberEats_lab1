const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const mongoose = require('mongoose');
const restaurantResolvers = {
    Query: {
        async getRestaurants() {
            try{
            const restaurants = await Restaurant.find();
            return restaurants;
            }
            catch(err){
                console.log(err)
            }
        },
        async getRestaurantDishes(_, {RestaurantId}){
            let restaurant = await Restaurant.findOne({ RestaurantId: RestaurantId });
            return restaurant.Dishes
        }
    },
    Mutation: {
        async addOrEditDish(_,{
            DishId, 
            RestaurantId, 
            DishName, 
            DishType,
            DishDesc,
            DishCategory,
            Price,
            DishImage
         }){
 
         let payload = {
             DishId,
             RestaurantId,
             DishName,
             DishType,
             DishDesc,
             DishCategory,
             Price,
             DishImage
         }
         let restaurant = await Restaurant.findOne({ RestaurantId: RestaurantId });
         if(!restaurant){
             throw new UserInputError("Restaurant not found");
         }
         let updatedRestaurant = {};
         if (!DishId) {
             payload.RestaurantId = RestaurantId;
             restaurant.Dishes.push(payload);
             let response = await restaurant.save();
             updatedRestaurant = response.toObject();
             delete updatedRestaurant.RestaurantPassword;
             return updatedRestaurant;
         }else{
             let dish = restaurant.Dishes.id(mongoose.Types.ObjectId(DishId));
             dish.set({...payload});
             let response = await restaurant.save();
             updatedRestaurant = response.toObject();
             delete updatedRestaurant.RestaurantPassword;
             return updatedRestaurant;
         }
        }
     }
}


module.exports = restaurantResolvers;