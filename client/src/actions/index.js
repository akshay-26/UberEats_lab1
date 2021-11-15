const logged = (username, useremail) => ({
    type: 'LOGIN',
    payload: username,
    email: useremail
   
  });
  
  const signed = (username, useremail) => ({
    type: 'SIGNIN',
    payload: username,
    email: useremail
   
  });
  
  const logout = (username, useremail) => ({
    type: 'LOGOUT',
    payload: username,
    email: useremail
   
  });

  const userData = (profile) => ({
    type: 'Profie',
    payload: profile
   
  });

  const UserAddress = (address) => ({
    type: 'Address',
    payload: address
   
  });

  const Cart = (Cart) => ({
    type: 'Cart',
    payload: Cart
   
  });

  
  const CustomerOrder = (CustomerOrder) => ({
    type: 'CustomerOrder',
    payload: CustomerOrder
   
  });

  const RestaurantOrder = (RestaurantOrder) => ({
    type: 'RestaurantOrder',
    payload: RestaurantOrder
   
  });

  export {RestaurantOrder, CustomerOrder, Cart, UserAddress, userData, signed, logout, logged as default };
  