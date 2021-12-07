const { UserInputError } = require("apollo-server")
const Customer = require("../model/CustomerDetails")
const Restaurant = require("../model/RestaurantDetails")
const Order = require("../model/Orders")


const addressResolvers = {
    Query: {
        async getDeliveryAddress(_, {CustomerId}) {
            console.log(CustomerId)
            let customer = await Customer.findOne({ CustomerId: CustomerId });
            if (!customer) {
                throw new UserInput("Customer Not Found")
            }
            const deliveryAddress = customer.Address || [];
            if (deliveryAddress) {
                return deliveryAddress;
            }
        }
    },
    Mutation: {
        async addDeliveryAddress(_, { CustomerId, AddressLine1, AddressLine2, City,
            State, Country, Pincode, AddressName }) {
            const payload = {
                AddressLine1: AddressLine1,
                AddressLine2: AddressLine2,
                City: City,
                State: State,
                Country: Country,
                Pincode: Pincode,
                AddressName: AddressName
            }
            let customer = await Customer.findOne({ CustomerId: CustomerId });
            if (!customer) {
                throw new UserInputError("Customer Not Found")
            }
            let address = customer.Address.toObject().filter(addr => addr.AddressName === payload.AddressName);
            if (address.length) {
                throw new UserInputError("address with same name already exists");
            }
            customer.Address.push(payload);
            let updatedCustomer = await customer.save();
            address = updatedCustomer.Address.toObject().filter(addr => addr.AddressName == payload.AddressName);
            console.log(address)
            return address[0];
        }
    }



}


module.exports = addressResolvers;