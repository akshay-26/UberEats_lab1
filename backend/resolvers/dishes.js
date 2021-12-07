const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")

const dishesResolvers = {
    Query:{
        async getAllDish() {
            const restaurants = await Restaurant.find();
            let dishes = [];
            console.log(restaurants)
            restaurants.map(restaurant => dishes.push(...restaurant.Dishes));
            return dishes;
        },
        async getDishes(_, {RestaurantId}) {
            console.log(RestaurantId)
            let dishes = await Restaurant.findOne({RestaurantId:RestaurantId})
            
            let dish = dishes.Dishes
            console.log(dish)
            return dish;
        },
        // async getOneDish() {

        // },
        // async getRestDishes() {

        // }
    },
    Mutation: {
        async addDishes(_, {}){

        }
    }
}

module.exports = dishesResolvers;