const { gql } = require("apollo-server");

module.exports = gql`
input SignupInput {
    name: String
    email: String
    password: String
}

input AddressInput {
    _id:String
    AddressId: String,
    AddressName: String,
    AddressLine1: String,
    AddressLine2: String,
    City: String,
    State: String,
    Pincode: String,
    Country: String
}

input OrderDetailsInput {
    _id: String
    RestaurantId :String
    DishName: String
    DishDesc:String
    Category:String
    DishType: String
    Quantity:String
    Price:String
    Image:String
}
input OrderInput {
    CustomerId: String
    CustomerName:String
    Image: String
    RestaurantId: String
    RestaurantName: String
    DeliveryType:String
    SpecialInstructions: String
    DeliveryAddress: AddressInput
    OrderDetails: [OrderDetailsInput]
}
type Address {
    _id: String,
    AddressName: String,
    AddressLine1: String,
    AddressLine2: String,
    City: String,
    State: String,
    Pincode: String,
    Country: String
}

type Customer {
    CustomerId: String,
    EmailId: String ,
    CustomerName: String,
    DoB: String,
    PhoneNumber: String,
    NickName: String,
    Country: String,
    City: String,
    ImageUrl: String,
    ZipCode: String,
    State: String
    Address: [Address],
    Favourites: [String]
}

type Dish {
    RestaurantId: String,
    DishName: String,
    DishDesc: String,
    DishCategory: String,
    DishType: String,
    Price: String,
    DishImage: String
}

type Restaurant {
    RestaurantId: String,
    RestaurantEmail: String,
    RestaurantName: String,
    RestaurantDesc: String,
    PhoneNumber: String,
    Mode: String,
    Country: String,
    State: String,
    City: String,
    Pincode: String,
    Image: String,
    WorkHrsFrom: String,
    WorkHrsTo: String,
    Dishes: [Dish]
}

type OrderDetails {
    DishName: String,
    DishDesc: String,
    Quantity: Int,
    Price: Float
}

type Order {
    OrderId: String,
    CustomerId: String,
    CustomerName: String,
    ImageUrl: String,
    RestaurantId: String,
    RestaurantName: String,
    OrderStatus: String,
    DeliveryType: String,
    CreatedAt: String,
    LastUpdatedTime: String,
    DeliveryAddress: [Address],
    SpecialInstruction: String,
    OrderDetails: [OrderDetails]
}

type User {
    name: String
    email: String
    phone: String
    timezone: String
    language: String
    currency: String
}

type Query {
    getRestaurants: [Restaurant]
    getRestaurant(RestaurantId: ID): Restaurant
    getRestaurantProfile(RestaurantId: String): Restaurant
    getAllDish: Dish
    getDishes(RestaurantId: String): [Dish]
    getCustomerOrder(CustomerId: String): [Order]
    getDeliveryAddress(CustomerId: String): [Address]
    getUserProfile(EmailId: String): Customer
    getReceipt(OrderId: String): [OrderDetails]
    getRestaurantDishes(RestaurantId: String): [Dish]
    getRestaurantOrder(RestaurantId: String): [Order]
}
type Mutation {
    customerLogin(EmailId: String, CustomerPassword: String): Customer
    customerRegister(CustomerName: String, EmailId:String, CustomerPassword: String): Customer
    restaurantRegister(RestaurantName:String, RestaurantEmail:String, RestaurantPassword:String): Restaurant
    restaurantLogin(EmailId: String, RestaurantPassword: String): Restaurant
    addDeliveryAddress(CustomerId: String, AddressLine1:String,
        AddressLine:String, City:String, State: String, Country:String,
        Pincode:String, AddressName:String) : [Address]
    postOrder( Order: OrderInput): Order
    addOrEditDish(
        DishId: String, 
        RestaurantId: String, 
        DishName: String, 
        DishType: String,
        DishDesc: String,
        DishCategory: String,
        Price: String,
        DishImage: String
     ): Restaurant
     updateOrderStatus(OrderId:String, OrderStatus:String) : Order
}
`