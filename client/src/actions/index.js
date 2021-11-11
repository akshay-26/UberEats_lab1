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


  export { userData, signed, logout, logged as default };
  