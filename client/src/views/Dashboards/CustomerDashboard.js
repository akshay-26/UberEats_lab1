/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { store } from '../../state/store/store';
//import SideBar from '../Navigation/NavigationBar';
import { useEffect } from 'react';
import axios from 'axios';
import backendServer from '../../Config';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import NavigationBar from '../Navigation/NavigationBar';
import Navbar from '../Navbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NavbarCustomer from '../NavbarCustomer';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import { RESTAURANT_DISHES } from '../queries';
const theme = createTheme();

export default function CustomerDashBoard() {

  const dishcategory = [
    {
      key: "all",
      value: "All"
    },
    {
      key: "veg",
      value: "Veg"
    }, {
      key: "nonveg",
      value: "Non-Veg"
    }, {
      key: "vegan",
      value: "Vegan"
    }];

  if (!localStorage.getItem("CustomerID")) {
    history.push("/LandingPage")
  }

  const [cards, setCards] = useState([]);
  const [initialLoad, setInitialLoad] = useState([]);
  const [cart, setCart] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const history = useHistory();
  const [openCart, setOpenCart] = useState(false);
  const [multipleOrderDialog, setMultipleOrderDialog] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState('');
  const [newRestaurant, setNewRestaurant] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [filterCategory, setFilterCategory] = useState('All');
  const [defaultimage, setDefaultImg] = useState('')
  const CurrRestaurantDetails = JSON.parse(sessionStorage.getItem('currentRestaurantDetails'))
  console.log("sesson Value", CurrRestaurantDetails)

  console.log({ cart })
  console.log({ tempCart })


  useEffect(async () => {
    const restaurantId = sessionStorage.getItem('currentRestaurant');
    console.log("RestaurantId", restaurantId)

    const query = RESTAURANT_DISHES;
    const RestaurantId = restaurantId;
    const url = `${backendServer}/getDishes`;
    const response = await axios.post(url,
      {
        query,
        variables: {
          RestaurantId
        },
      }).then((response) => {
        console.log(response.data.data.getDishes)

        setCards(response.data.data.getDishes);
        setInitialLoad(response.data.data.getDishes);
        setDefaultImg(response.data.data.getDishes.DishImage)


      })

    // console.log("store is", store.getState());
    let currentCart = JSON.parse(sessionStorage.getItem('currentCart')) || [];
    setCart(currentCart);
    console.log(cart);
  }, []);

  const persistCartOnSession = (cart) => {
    sessionStorage.setItem('currentCart', JSON.stringify(cart));
  }

  const onNewOrder = () => {
    setCart(tempCart);
    setCurrentRestaurant(newRestaurant);
    setNewRestaurant('');
    persistCartOnSession(tempCart);
    setMultipleOrderDialog(false);
  }

  const onAddToCart = (dish) => {
    if (cart.length != 0 && dish.RestaurantId != cart[0].RestaurantId) {
      console.log(cart)
      console.log(dish)
      setCurrentRestaurant(cart[0].RestaurantName);
      setNewRestaurant(dish.RestaurantName);
      setTempCart([{ ...dish, Quantity: 1 }]);
      setMultipleOrderDialog(true);
      return;
    }
    let newCart = [...cart, dish];
    let index = cart.findIndex(item => item._id === dish._id);
    if (index == -1) {
      newCart = [...cart, { ...dish, Quantity: 1 }]
    } else {
      newCart = [...cart];
      newCart[index].Quantity++;
    }
    setCart(newCart);
    persistCartOnSession(newCart);
    console.log("cart", newCart);
  }

  const onRemoveFromCart = (dish) => {
    let newCart = [...cart]
    let index = newCart.findIndex(item => item._id === dish._id)
    if (index == -1)
      return;
    newCart[index].Quantity > 1 ? newCart[index].Quantity-- : newCart.splice(index, 1);
    console.log(newCart.length)
    if (newCart.length == 0)
      setOpenCart(false);
    setCart(newCart)
    persistCartOnSession(newCart);
    console.log("cart after removing", newCart);
  }

  const onSearch = (type, searchTerm) => {
    if (searchTerm == '') {
      setCards(initialLoad);
      return;
    } else {
      switch (type) {
        case "Dishes":
          let dfilter = initialLoad.filter(card => card.DishName != null && card.DishName.toLowerCase().includes(searchTerm.toLowerCase()));
          setCards(dfilter);
          break;
        case "Dish Type":
          let tfilter = initialLoad.filter(card => card.DishType != null && card.DishType.toLowerCase().includes(searchTerm.toLowerCase()));
          setCards(tfilter);
          break;
        case "Category":
          let cfilter = initialLoad.filter(card => card.Category != null && card.Category.toLowerCase().includes(searchTerm.toLowerCase()));
          setCards(cfilter);
          break;
      }
    }
  }

  const onSearchCategory = (searchTerm) => {
    console.log("searchTerm", searchTerm)
    setFilterCategory(searchTerm);
    if (searchTerm == "All") {
      setCards(initialLoad);
      return;
    }
    let tfilter = searchTerm == "All" ? initialLoad : initialLoad.filter(card => card.DishType != null
      && card.DishType == filterType);
    let cfilter = initialLoad.filter(card => card.DishCategory == searchTerm)
    setCards(cfilter);
  }

  const vieworders = () => {
    history.push("/CustomerOrder")
  }
  const styles =
  {

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop: '30',

      display: 'block',
      margin: 'auto',
      // height: '50',
      width: '25'
    }

    // }

  };
  return (
    <>
      <NavbarCustomer onSearch={onSearch} view='customerrestaurant' />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              {/* <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Hi
              </Typography> */}
              {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Scroll Through Your Favourite Restaurant
              </Typography> */}
              <Card
                sx={{ height: '70%', width: '100%', display: 'flex', flexDirection: 'row' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '00.25%',
                  }}
                  image={defaultimage}
                  alt="random"
                  style={styles}
                />
                {/* <h3>"rest"</h3> */}
              </Card>
              <br></br>
              <Box textAlign='center'>
                <Button variant='contained' onClick={vieworders}>
                  View Orders
                </Button>
              </Box>

              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Grid item xs={12} sm={6} >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    select
                    name="category"
                    label="Dish Category"
                    type="text"
                    id="category"
                    value={filterCategory}
                    onChange={(event) => { setFilterCategory(event.target.value); onSearchCategory(event.target.value) }}
                    autoComplete="Dish Category"
                  >
                    {dishcategory.map((option) => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* onClick={()=>onAddDishes()} */}
                {/* <Button variant="outlined">View Orders</Button> */}
              </Stack>

            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {console.log(cards)}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.DishId} xs={6} sm={3} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '00.25%',
                      }}
                      image={card.DishImage}
                      style={styles}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.DishName}
                      </Typography>
                      <Typography>
                        {card.DishDesc}
                      </Typography>
                      <Typography>
                        $ {card.Price}
                      </Typography>
                      <Typography>
                        Category: {card.DishCategory}
                      </Typography>
                      <Typography>
                        Type: {card.DishType}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => { onAddToCart(card) }}><AddTaskIcon></AddTaskIcon></Button>
                      <Button size="small" onClick={() => { onRemoveFromCart(card) }}><DeleteOutlineIcon></DeleteOutlineIcon></Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* dialog */}

        <div>
          <Dialog open={multipleOrderDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create new order?</DialogTitle>
            <DialogContent>
              <Typography variant="body2">Your cart already contains orders from other restaurant .
                Would you like to clear the cart and start new order to add items from {CurrRestaurantDetails.RestaurantName}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onNewOrder()} variant="contained" color="primary">
                New Order
              </Button>
              <Button onClick={() => setMultipleOrderDialog(false)} variant="contained" color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>


        {/* dialog */}
      </ThemeProvider>
    </>
  );
}