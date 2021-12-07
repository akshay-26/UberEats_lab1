import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import react, { useState, useEffect } from "react";
import '../images/style.css';
import axios from 'axios';
import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from './../Config'
import { useHistory } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import logged from '../actions';
import jwt_decode from 'jwt-decode';
import {LOGIN} from "./mutations"

const LandingPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [token, setToken] = useState('');

  const dispatch = useDispatch();

  const login = () => {
    const EmailId = email;
    const CustomerPassword = password;
    const query = LOGIN;
    axios.post(`${backendServer}/customerLogin`,{
      query,
      variables: {
        EmailId,
        CustomerPassword,
      },
    }
  
    ).then((response) => {
    //  setToken(response.data.data.loginCustomer.token);
    //  const tokenArray = response.data.token.split(' ');
    //  localStorage.setItem('token', response.data.token);
      console.log( response.data.data.customerLogin.CustomerId)
      // eslint-disable-next-line prefer-const
    //  let decodedToken = jwt_decode(tokenArray[1]);
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('CustomerID', response.data.data.customerLogin.CustomerId);
      // console.log("decodedToken", decodedToken);
       localStorage.setItem('email', response.data.data.customerLogin.EmailId);
     localStorage.setItem('fullname', response.data.data.customerLogin.CustomerName);
      //localStorage.setItem("CustomerID", response.data[0].CustomerId)
      console.log(response)
  

     // dispatch(logged(decodedToken.EmailId));
      history.push('/RestaurantView')
    })
      .catch((error) => {
        console.log(error)
        setAlert("Invalid User Name or Password")
      })

    //    return email.length > 0 && password.length > 0;
  }

  console.log(email)

  useEffect(async () => {
    sessionStorage.setItem('currentUser', email);
  }, [email]);

  const value = useState(async () => {
    localStorage.getItem('currentUser')
  });
  console.log("curr user", value)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

  }
  const styleimg = {
    display: 'block',
    margin: 'auto'
  }
  const textstyle = {
    fontsize: '30px',
    lineheight: '36px',
    fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
    marginbottom: '36px',
    textalign: 'left'
  }
  const stylebutton = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${wavebg})`
  }

  return (
    <>
      <Login />
      <div className="Login" style={stylebutton}>
        <Form onSubmit={handleSubmit}>
          <img src={logo} width={'200'} height={'150'} style={styleimg} alt='' />

          <h2 style={textstyle}>Welcome Back</h2>
          <br></br>
          <h6 style={textstyle}>Please Sign In with your E-mail</h6>
          <br></br>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button block size="lg" type="submit" onClick={() => login()} style={styleimg} disabled={!validateForm()}>
            Login
          </Button>
          <br></br>
          {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}

        </Form>
      </div>
    </>
  )
}

export default LandingPage;