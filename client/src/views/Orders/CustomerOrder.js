/* eslint-disable react-hooks/exhaustive-deps */
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ReceiptIcon from '@mui/icons-material/Receipt';
import Receipt from '../Dashboards/Receipt';
import NavbarCustomer from '../NavbarCustomer';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { CUSTOMER_ORDER } from '../queries';


const theme = createTheme();

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CustomerOrder = () => {

  const history = useHistory();

  if (!localStorage.getItem("CustomerID")) {
    history.push("/LandingPage")
  }

  const [OrderResponse, setOrderResponse] = useState([]);

  const [searchValue, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [value, setValue] = useState([])
  //const [value2, setValue2] = useState([])

  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [cancel, setCancel] = useState(false)
  // const [cancel, setCancel] = React.useState({
const [OrderId, setOrderId] = useState('')
  //   CheckCancel: true


  // });

  const onChange = (event) => {
    setSearch(event.target.value)

    console.log("filter", event.target.value)
    if (event.target.value == "All Orders") {

      console.log("if", event.target.value)
      console.log(value)
      setOrderResponse(value)
    }
    else if (event.target.value != '') {
      console.log("else", event.target.value)
      let filter_1 = value.filter(res => res.RestaurantId != null && res.OrderStatus == event.target.value);
      console.log("orderFil", filter_1)
      setOrderResponse(filter_1);

    }

  }



  let FilterValue = '';
  //console.log("filter Value", searchValue)

  // switch (searchValue) {
  //     case 1:
  //         FilterValue = "Order Received";
  //         break;
  //     case 2:
  //         FilterValue = "Preparing";
  //         break;
  //     case 3:
  //         FilterValue = "On The Way";
  //         break;
  //     case 4:
  //         FilterValue = "Delivered";
  //         break;
  //     case 5:
  //         FilterValue = "Pick Up Ready";
  //         break;
  //     case 6:
  //         FilterValue = "Picked Up";
  //         break;
  //     default:
  //         FilterValue = "";
  //         break;
  // }

  //  console.log(FilterValue)



  //   }
  //      if(OrderResponse.length != 0)
  //      {
  // let filter_1 = OrderResponse.filter(res => res.RestaurantName != null && res.OrderStatus == FilterValue);

  // console.log("orderFil", filter_1)

  //  console.log(OrderResponse)
  //      }



  useEffect(async () => {
    console.log("in customer order")

    const CustomerId = localStorage.getItem("CustomerID")
    const query = CUSTOMER_ORDER;
    const response = await axios.post(`${backendServer}/getCustomerOrder`, {
      query,
        variables: {
          CustomerId
        
      }
    })

    console.log("orders", response.data.data.getCustomerOrder)
    setOrderResponse(response.data.data.getCustomerOrder)
    setValue(response.data.data.getCustomerOrder)
    //const data1 = OrderResponse[0].DeliveryType; 
    // console.log(OrderResponse[0].DeliveryType)
  }, [])


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    const idx = OrderResponse.findIndex(item=>item.OrderId==OrderId);
        console.log("idx value", idx)
       OrderResponse[idx].OrderStatus = "Cancel Order";

       const response =   axios.post(`${backendServer}/restaurant/CancelOrders/${OrderId}`
       ).then((response) =>{
           console.log(response)
       })
       .catch((err) =>{
           console.log(err)
       })

  };
  const handleCloseNo = () => {
    setOpen(false);
  };

  const onView = (card) => {
    setCurrentCard(card)
    console.log(card)
    setOpenOrder(true);
  }


  const CancelOrder = (card, cardId) => {
    console.log("card.OrderStatus", card.OrderStatus)
    if (card.OrderStatus ==  "Order Received") {
      setOrderId(cardId)
      console.log("cardId", cardId)
      setCancel(true)
      console.log("able to cancel")
      console.log(cancel)

      setOpen(true);


    }
    else {
      setOpen(true);

      console.log(cancel)

      setCancel(false)
      return;
    }
  }
  //console.log("setCancel", cancel)

  //pagination

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OrderResponse.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // pagination

  return (
    <>
      <NavbarCustomer view="OrderPage" handleBtnChange={onChange} />
      <h2 style={{
        display: "flex",
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center"
      }}>Your Orders</h2>
      <div style={{
        display: "flex",
        paddingTop: "80px",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <List sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}>
          {/* {OrderResponse.map((card, index) => { */}
          {(rowsPerPage > 0
            ? OrderResponse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : OrderResponse
          ).map((card) => (
            <>
              <ListItem key={card.OrderId} alignItems="flex-center" >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={card.ImageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={card.RestaurantName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        paddingRight="15px"
                      >
                        {card.LastUpdatedTime}
                      </Typography>
                      {" ", card.OrderStatus}
                    </React.Fragment>
                  }
                />

                {/* receipt button */}

                <Button variant="outlined" onClick={() => onView(card)}>
                  View Receipt
                </Button>
                &nbsp; &nbsp;
                <Button variant="outlined" onClick={() => CancelOrder(card, card.OrderId)}>
                  {/*  onClick={handleClickOpen} */}
                  Cancel Order
                </Button>


                {/* Receipt button */}
              </ListItem>

              <Divider variant="middle" component="li" padding="20px" />
            </>
          ))}

          <TableFooter align="right">
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10, , { label: 'All', value: -1 }]}
                colSpan={6}
                count={OrderResponse.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>

        </List>


        <Dialog open={openOrder} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Order Reciept</DialogTitle>
          <DialogContent>
            <Receipt order={currentCard} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpenOrder(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* cancel order dialog */}
        {cancel ?
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Cancel Order?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to cancel your order and sleep on an empty stomach?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Yes</Button>
              <Button onClick={handleCloseNo} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>

          // {/* cancel order dialog */}
          :
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Cancel Order"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your Order Has Been Received By The Restaurant, Please Call Our Customer Care Agent To Cancel Your Order
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseNo}>Close</Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    </>

  );

}

export default CustomerOrder;