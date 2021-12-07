export const LOGIN = `mutation CustomerLogin($EmailId: String, $CustomerPassword: String) {
    customerLogin(EmailId: $EmailId, CustomerPassword: $CustomerPassword) {
      CustomerId
      EmailId
      CustomerName
      DoB
      PhoneNumber
      NickName
      Country
      City
      ImageUrl
      ZipCode
      Address {
        _id
        AddressName
        AddressLine1
        AddressLine2
        City
        State
        Pincode
        Country
      }
      State
      Favourites
    }
  }`;

  export const RESTAURANTLOGIN = `mutation RestaurantLogin($EmailId: String, $RestaurantPassword: String) {
    restaurantLogin(EmailId: $EmailId, RestaurantPassword: $RestaurantPassword) {
      RestaurantId
      RestaurantEmail
      RestaurantName
      RestaurantDesc
      PhoneNumber
      Mode
      Country
      State
      City
      Pincode
      Image
      WorkHrsFrom
      WorkHrsTo
      Dishes {
        RestaurantId
        DishName
        DishDesc
        DishCategory
        DishType
        Price
        DishImage
      }
    }
  }`;

  export const CUSTOMER_REGISTER = `mutation Mutation($CustomerName: String, $EmailId: String, $CustomerPassword: String) {
    customerRegister(CustomerName: $CustomerName, EmailId: $EmailId, CustomerPassword: $CustomerPassword) {
      CustomerId
      EmailId
      CustomerName
      DoB
      PhoneNumber
      NickName
      Country
      City
      ImageUrl
      ZipCode
      State
      Address {
        _id
        AddressName
        AddressLine1
        AddressLine2
        City
        State
        Pincode
        Country
      }
      Favourites
    }
  }`;

  export const RESTAURANT_REGISTER = `mutation restaurantRegister($RestaurantName: String, $RestaurantEmail: String, $RestaurantPassword: String) {
    restaurantRegister(RestaurantName: $RestaurantName, RestaurantEmail: $RestaurantEmail, RestaurantPassword: $RestaurantPassword) {
      RestaurantId
      RestaurantEmail
      RestaurantName
      RestaurantDesc
      Mode
      PhoneNumber
      Country
      City
      State
      Pincode
      ImageUrl
      WorkHrsFrom
      WorkHrsTo
      Dishes {
        RestaurantId
        DishName
        DishDesc
        DishCategory
        DishType
        Price
        DishImage
      }
    }
  }`;

export const postOrder = `mutation Mutation($Order: OrderInput) {
  postOrder(Order: $Order) {
    OrderId
    CustomerId
    CustomerName
    ImageUrl
    RestaurantId
    RestaurantName
    OrderStatus
    DeliveryType
    CreatedAt
    LastUpdatedTime
    DeliveryAddress {
      AddressName
      _id
      AddressLine1
      AddressLine2
      City
      State
      Pincode
      Country
    }
    SpecialInstruction
    OrderDetails {
      DishName
      DishDesc
      Quantity
      Price
    }
  }
}`;

export const ADD_DISH = `mutation Mutation($dishId: String, $restaurantId: String, $dishName: String, $dishType: String, $dishDesc: String, $dishCategory: String, $price: String, $dishImage: String) {
  addOrEditDish(DishId: $dishId, RestaurantId: $restaurantId, DishName: $dishName, DishType: $dishType, DishDesc: $dishDesc, DishCategory: $dishCategory, Price: $price, DishImage: $dishImage) {
    RestaurantId
    RestaurantEmail
    RestaurantName
    RestaurantDesc
    PhoneNumber
    Mode
    Country
    State
    City
    Pincode
    Image
    WorkHrsFrom
    WorkHrsTo
    Dishes {
      RestaurantId
      DishDesc
      DishName
      DishImage
      Price
      DishType
      DishCategory
    }
  }
}`;
export const ORDER_STATUS = `mutation Mutation($OrderId: String, $OrderStatus: String) {
  updateOrderStatus(OrderId: $OrderId, OrderStatus: $OrderStatus) {
    OrderId
    CustomerId
    CustomerName
    ImageUrl
    RestaurantId
    RestaurantName
    OrderStatus
    DeliveryType
    CreatedAt
    LastUpdatedTime
    DeliveryAddress {
      _id
      AddressName
      AddressLine1
      AddressLine2
      City
      State
      Pincode
      Country
    }
    SpecialInstruction
    OrderDetails {
      DishName
      DishDesc
      Quantity
      Price
    }
  }
}`;