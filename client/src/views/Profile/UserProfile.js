import NavbarCustomer from '../NavbarCustomer';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'react-bootstrap/esm';
import avatar from '../../images/img_avatar2.png'
import logo from '../../images/UberEATS.png'
import backendServer from '../../Config'
import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import {userData} from '../../actions';
// const val = localStorage.getItem("currentUser")

//console.log(val)
const locations = [
  {
    value: 'United States',
    key: 'USA',
    cities: [{
      key: "SJC",
      value: "San Jose",
    },
    {
      key: "MPS",
      value: "Milpitas"
    },
    {
      key: "SVA",
      value: "Sunny Vale"
    }]
  },
  {
    value: 'India',
    key: 'IN',
    cities: [{
      key: "DEL",
      value: "Delhi"
    }, {
      key: "BLR",
      value: "Bangalore"
    }]
  }
];

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  //const [imageURL, setimageURL] = useState('')
  const [country, setCountry] = useState('')
  const [cities, setCities] = useState([]);
  const [restaurant, setRestaurant] = useState([]);

  const [file, setFile] = useState('');

  const [errors, setErrors] = useState({})

  const findFormErrors = () => {

    // const zipcode = zipcode
    //  const phonenumber1 = phonenumber

    let isValid = true;

    let newErrors = {}
    // name errors

    if (!phonenumber || phonenumber === '') 
    {
      newErrors["phonenumber"] = 'cannot be blank!'
      isValid = false;
    }
    if (typeof phonenumber !== "undefined") {
          
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(phonenumber)) {
        isValid = false;
        newErrors["phonenumber"] = "Please enter only number.";
      }else if(phonenumber.length != 10){
        isValid = false;
        newErrors["phonenumber"] = "Please enter valid phone number.";
      }
    }

    if(!zipcode || zipcode === '')
    {
      newErrors["Zip"] = "Zip Code cannot be blank"
      isValid = false;
    }
    if(zipcode.length != 5)
    {
      newErrors["Zip"] = "Zip Code should be 5 digits"
      isValid = false;

    }
    
    // food errors

   // isValid = true;

    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      // console.log("errors", newErrors)
      setErrors(newErrors)
    }
    return isValid
  
}
  // const [emailUpdate, setEmail] = useState('');
  // const [fullnameUpdate, setFullname] = useState('');
  // const [phonenumberUpdate, setPhonenumber] = useState('');
  // const [cityUpdate, setCityUpdate] = useState('');
  // const [stateUpdate, setState] = useState('');
  // const [zipcodeUpdate, setZipcode] = useState('');
  // const [countryUpdate, setCountryUpdate] = useState('')

  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const history = useHistory();

  console.log(fullname);

  if (!localStorage.getItem("CustomerID")) {
    history.push("/LandingPage")
  }



  const updateProfile = async (event) => {

    event.preventDefault();
    //const data = new FormData(document.getElementById("submit"));

    //data.append('image', image);
    // data.append('file', "file_name.jpg");
    //   const uploadConfig = {
    //     headers: {
    //         "content-type": "multipart/form-data"
    //     }
    // };
   
    if(findFormErrors()){

      console.log("phonenumber", phonenumber)
    if (image) {
      let imageData = new FormData()
      imageData.append('image', image)
      var url1;
      let url = `${backendServer}/image/user`

      const response = await axios.post(url, imageData);
      console.log("imageResponse 123", response.data.imageUrl)
      url1 = response.data.imageUrl
      console.log("URL", url1)
      setImageUrl(url1);
    }

   
    const userimage = localStorage.setItem("userImage", url1);

    var CustomerId =  localStorage.getItem("CustomerID")
    console.log("country", imageUrl)
    let payload = {
      CustomerId,
      email,
      fullname,
      nickname,
      phonenumber,
      city,
      state,
      zipcode,
      url1,
      country,
      state,
      zipcode
    }
    console.log("payload 123", payload)
    console.log("errors", errors.phonenumber)

    // const response = await
    const tokenValue = localStorage.getItem('token');
    //axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backendServer}/UserProfile`, payload ,{
      headers: {
          'authorization': tokenValue,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  })
      .then((response) => {
        console.log(response);
        setFile("");
        //window.location.reload(false);
        history.push("/RestaurantView")
      });
  }
}
const dispatch = useDispatch();


  useEffect(async () => {

    const val = sessionStorage.getItem("currentUser");
    console.log(val)
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const response = await axios.get(`${backendServer}/UserProfile/User`, { params: { email: val } });
    dispatch(userData(response.data))
    console.log("user profile", response.data.EmailId)
    const username = localStorage.setItem("username", response.data.CustomerName);
    if (val) {
      setEmail(response.data.EmailId);
      setFullname(response.data.CustomerName);
      setNickname(response.data.NickName)
      setPhonenumber(response.data.PhoneNumber)
      setImageUrl(response.data.Image);
      setCity(response.data.City)
      setCountry(response.data.Country)
      setState(response.data.State)
      setZipcode(response.data.ZipCode)
    }
    // console.log(dbemail);

  }, []);

  useEffect(async () => {
    const userid = localStorage.getItem("CustomerID")
    const response = await axios.get(`${backendServer}/favourites/${userid}`)
    setRestaurant(response.data);

  }, [])



  const imageup = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file))
  };

  const filterCities = (country) => {
    const records = locations.filter(loc => loc.value == country);
    setCities(records[0].cities || []);
  }
  const onCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value);

    const records = locations.filter(loc => loc.value == event.target.value);
    setCities(records[0].cities || []);
  }

  //  const {items} = this.response;
  return (
    <>
      <NavbarCustomer view='customerdashboard' />
      <br></br>
      <div class="container">
        <div class="row gutters">
          <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="account-settings">
                  <div class="user-profile">
                    <div class="user-avatar">
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" /> */}

                      <Image className="main myImage" src={imageUrl} height={140} width={270} />
                      <br></br>
                      <br></br>

                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={imageup}
                      />
                    </div>
                    <br></br>
                    <h6 class="user-name" style={{ color: 'blue' }}>Welcome {nickname}</h6>
                    {/* <h6 class="user-email"> {email}</h6> */}
                  </div>
                  <div class="about">

                    <h5 style={{ color: 'blue' }}>Your Favourite Restaurant's</h5>
                    {restaurant.map((card) => (

                      <p>{card.RestaurantName}</p>

                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Full Name</label>
                      <input type="text" class="form-control" id="fullName" placeholder={fullname} onChange={(event) => {
                        setFullname(event.target.value);
                      }} />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="fullName">Nick Name</label>
                      <input type="text" class="form-control" id="fullName" placeholder={nickname} onChange={(event) => {
                        setNickname(event.target.value);
                      }} />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input type="email" class="form-control" id="eMail" placeholder={email} onChange={(event) => { setEmail(event.target.value); }} />
                      {/* onChange={(e) => { setEmail(e.currentTarget.value); }} */}
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input type="number" size="10" class="form-control" id="phone" required placeholder={phonenumber} onChange={(event) => {
                        setPhonenumber(event.target.value);

                      }} />
                      <div className="text-danger">{errors.phonenumber}</div>
                    </div>
                  </div>

                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                  </div>

                  {/* country */}

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="city">Country</label>
                      <br></br>
                      {/* <select class="form-control" id="city"> */}
                      <select type="name" class="form-control" id="city" placeholder={country} onChange={(event) => { onCountryChange(event) }} >

                        {locations.map((option) => (
                          <option key={option.key} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="city">City</label>
                      <input type="name" class="form-control" id="city" placeholder={city} onChange={(event) => {
                        setCity(event.target.value);
                      }} ></input>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">State</label>
                      <input type="text" class="form-control" id="state" placeholder={state} onChange={(event) => {
                        setState(event.target.value);
                      }} />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Zip Code</label>
                      <input type="text" class="form-control" id="zip" placeholder={zipcode} onChange={(event) => {
                        setZipcode(event.target.value);
                      }} />
                      <div className="text-danger">{errors.Zip}</div>

                    </div>
                  </div>
                </div>
                <br></br>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      {/* //<button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>  */}

                      <button type="submit" id="submit" name="submit" class="btn btn-primary" onClick={updateProfile}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile;