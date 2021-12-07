export const RESTAURANTS = `query Query {
    getRestaurants {
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
  }`

  export const RESTAURANT_DISHES = `query Query($RestaurantId: String) {
    getDishes(RestaurantId: $RestaurantId) {
      RestaurantId
      DishName
      DishDesc
      DishCategory
      DishType
      Price
      DishImage
    }
  }`;

  export const CUSTOMER_ORDER = `query Query($CustomerId: String) {
    getCustomerOrder(CustomerId: $CustomerId) {
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

  export const GET_DELIVERY_ADDRESS = `query GetDeliveryAddress($CustomerId: String) {
    getDeliveryAddress(CustomerId: $CustomerId) {
      _id
      AddressName
      AddressLine1
      AddressLine2
      City
      State
      Pincode
      Country
    }
  }`;

  export const CUSTOMER_PROFILE = `query Query($EmailId: String) {
    getUserProfile(EmailId: $EmailId) {
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

  export const RECEIPT_ORDER = `query Query($OrderId: String) {
    getReceipt(OrderId: $OrderId) {
      DishName
      DishDesc
      Quantity
      Price
    }
  }`;
  
  export const GET_DISHES = `query Query($RestaurantId: String) {
    getRestaurantDishes(RestaurantId: $RestaurantId) {
      RestaurantId
      DishName
      DishDesc
      DishCategory
      DishType
      Price
      DishImage
    }
  }`;

  export const RESTAURANT_ORDER = `query Query($RestaurantId: String) {
    getRestaurantOrder(RestaurantId: $RestaurantId) {
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
        AddressLine2
        AddressLine1
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

  