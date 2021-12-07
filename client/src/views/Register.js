import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import '../images/style.css';
import axios from 'axios';
import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from '../Config'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { signed } from '../actions';
import { Row, Col, Alert } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CUSTOMER_REGISTER } from "./mutations"

const RegisterUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState('');

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const Register = () => {
    const CustomerName = username;
    const EmailId = email;
    const CustomerPassword = password;
    const query = CUSTOMER_REGISTER;
    axios.post(`${backendServer}/customerRegister`,
      { query, 
        variables: {
          CustomerName, EmailId, CustomerPassword

        }
    }
    ).then((response) => {
      console.log(response)
      //const tokenArray = response.data.token.split(' ');
      //localStorage.setItem('token', response.data.token);
      // eslint-disable-next-line prefer-const
      //let decodedToken = jwt_decode(tokenArray[1]);
      //console.log("decodedToken", decodedToken)
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('CustomerId', response.data.data.customerRegister._id);
      //console.log(token);
      localStorage.setItem('EmailId', response.data.data.customerRegister.EmailId);
      localStorage.setItem('CustomerName', response.data.data.customerRegister.CustomerName);
      dispatch(signed(username, email));

      history.push('/RestaurantView')

    }).catch((error) => {
      setAlert("Email Already Exists")
    })

    //    return email.length > 0&& password.length > 0;
  }
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

          <Form.Group size="lg" controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
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
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>USA</MenuItem>
                <MenuItem value={20}>India</MenuItem>

              </Select>
            </FormControl>
          </Box>
          <br></br>
          <Button block size="lg" type="submit" onClick={() => Register()} style={styleimg} disabled={!validateForm()}>
            Submit
          </Button>
          {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}

        </Form>

      </div>
    </>
  )
}

export default RegisterUser;