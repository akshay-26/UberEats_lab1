const { UserInputError } = require("apollo-server")
const Customers = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const saltRounds = 10;
const bcrypt = require('bcrypt');
const registerResolvers = {
    Query: {

    },
    Mutation: {
        async customerRegister(_, { CustomerName, EmailId, CustomerPassword }) {
            const hashPassword = await bcrypt.hash(CustomerPassword, saltRounds);
            const customer = new Customers({
                CustomerName: CustomerName,
                EmailId: EmailId,
                CustomerPassword: hashPassword,
            });
            try {
                const emailExists = await Customers.findOne({ EmailId: EmailId });
                console.log('email', emailExists);
                if (emailExists) {
                    throw new UserInputError("Email Id already exists")
                }
                const savedUser = await customer.save();
                if (savedUser) {
                    const payload = {
                        _id: customer._id,
                        CustomerName: customer.CustomerName,
                        EmailId: customer.EmailId,
                    };
                    //   console.log(payload);
                    //   const token = await jwt.sign(payload, secret, {
                    //     expiresIn: 1000000,
                    //   });
                    // console.log(token);
                    // res.status(200).end(token);
                    return payload;
                }
            }
            catch (err) {
                throw new UserInputError(err)
            }
            
        },
        async restaurantRegister(_, { RestaurantName, RestaurantEmail, RestaurantPassword }) {
            const hashPassword = await bcrypt.hash(RestaurantPassword, saltRounds);
            const restaurant = new Restaurant({
                RestaurantName: RestaurantName,
                RestaurantEmail: RestaurantEmail,
                RestaurantPassword: hashPassword,
            });
            try {
                const emailExists = await Restaurant.findOne({ RestaurantEmail: RestaurantEmail });
                console.log('email', emailExists);
                if (emailExists) {
                    throw new UserInputError("Email Id already exists")
                }
                const savedUser = await restaurant.save();
                if (savedUser) {
                    const payload = {
                        _id: restaurant.RestaurantId,
                        RestaurantName: restaurant.RestaurantName,
                        RestaurantEmail: restaurant.RestaurantEmail,
                    };
                    //   console.log(payload);
                    //   const token = await jwt.sign(payload, secret, {
                    //     expiresIn: 1000000,
                    //   });
                    // console.log(token);
                    // res.status(200).end(token);
                    return payload;
                }
            }
            catch (err) {
                throw new UserInputError(err)
            }
            
        }
    }
}

module.exports = registerResolvers;