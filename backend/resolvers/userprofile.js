const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")

const userprofileResolvers = {
    Query: {
        async getRestaurantProfile (_, {RestaurantId}) {
            console.log(RestaurantId)
        const restaurant = await Restaurant.findOne({RestaurantId:RestaurantId});
        console.log(restaurant)
            return restaurant;
        },
        async getUserProfile(_, {EmailId}){
            //const email = msg.email;
            const customer = await Customers.findOne({EmailId:EmailId});
            return customer;
        }
    }
}

module.exports = userprofileResolvers;