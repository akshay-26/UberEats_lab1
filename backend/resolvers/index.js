const loginResolvers = require("./login");
const restaurantResolvers = require("./restaurant");
const userprofileResolvers = require("./userprofile")
const dishesResolvers = require("./dishes")
const orderResolvers = require("./orders")
const addressResolvers = require("./address")
const registerResolvers = require("./register")
const postorderResolvers = require("./postorder")
const receiptResolvers = require("./receipt")
module.exports = {
  Query: {
    ...loginResolvers.Query,
    ...restaurantResolvers.Query,
    ...userprofileResolvers.Query,
    ...dishesResolvers.Query,
    ...orderResolvers.Query,
    ...addressResolvers.Query,
    ...receiptResolvers.Query
  },
  Mutation: {
    ...loginResolvers.Mutation,
    ...restaurantResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...addressResolvers.Mutation,
    ...registerResolvers.Mutation,
    ...postorderResolvers.Mutation
  },
};
