import Login from './Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import '../images/style.css';
import axios from 'axios';
import logo from '../images/uberlogo.svg';
import wavebg from '../images/layered-waves.svg';
import backendServer from '../Config'
import { useHistory } from 'react-router-dom';
import {useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {signed} from '../actions';
import { Row, Col, Alert } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';


const RegisterUser = () =>{
  const history = useHistory();
  const dispatch = useDispatch();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState('');
  
    const Register =()=> {
          axios.post(`${backendServer }/RegisterUser`, 
        {username: username, useremail:email, userpassword: password }
        ).then((response)=>{
            console.log(response)
            const tokenArray = response.data.token.split(' ');
          localStorage.setItem('token', response.data.token);
          // eslint-disable-next-line prefer-const
          let decodedToken = jwt_decode(tokenArray[1]);
          console.log("decodedToken", decodedToken)
          // eslint-disable-next-line no-underscore-dangle
          localStorage.setItem('CustomerId', decodedToken._id);
          //console.log(token);
          localStorage.setItem('EmailId', decodedToken.EmailId);
          localStorage.setItem('CustomerName', decodedToken.CustomerName);
      dispatch(signed(username, email ));

      history.push('/RestaurantView')

        }).catch((error) => {
          setAlert("Email Already Exists")
        })
       
  //    return email.length > 0&& password.length > 0;
    }
    function validateForm() {
        return  email.length > 0 && password.length > 0;
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

    return(
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
        <Button block size="lg" type="submit" onClick={()=>Register()} style={styleimg} disabled={!validateForm()}>
          Submit
        </Button>
      {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}

      </Form>

    </div> 
    </>
    )
}

export default RegisterUser;