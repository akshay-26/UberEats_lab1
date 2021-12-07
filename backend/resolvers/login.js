const {UserInputError} = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const bcrypt = require("bcrypt");
const loginResolvers = {
    Query: {

    },
    Mutation: {
        async customerLogin(_, { EmailId, CustomerPassword }) {
          console.log(EmailId);
          console.log(CustomerPassword);
          let customer = await Customers.findOne({ EmailId: EmailId });
          if (!customer) {
              throw new UserInputError("Customer not found");
          }
          const isValid = await bcrypt.compare(
              CustomerPassword,
              customer.CustomerPassword
          );
          if (isValid) {
              let customerObject = customer.toObject();
              delete customerObject.CustomerPassword;
              return customerObject;
          } else {
              throw new UserInputError("Invalid user name or password");
          }
        }
        ,
        async restaurantLogin(_, { EmailId, RestaurantPassword }) {

          let restaurant = await Restaurant.findOne({ RestaurantEmail: EmailId });
          if (!restaurant) {
              throw new UserInputError("Restaurant not found");
          }
          const isValid = await bcrypt.compare(
              RestaurantPassword,
              restaurant.RestaurantPassword
          );
          if (isValid) {
              return restaurant;
          } else {
              throw new UserInputError("Invalid user name or password");
          }
        },
    }
}

module.exports = loginResolvers;