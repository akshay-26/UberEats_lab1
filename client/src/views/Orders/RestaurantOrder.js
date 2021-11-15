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
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import  { tableCellClasses } from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch } from 'react-redux';


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

const RestaurantOrder = () => {

  const dispatch = useDispatch();
   
    const history = useHistory();

  if(!localStorage.getItem("RestaurantId")){
    history.push("/RestaurantLogin")
  }
    const [OrderResponse, setOrderResponse] = useState([]);
    const [customerDet, setCustomerDet] = useState([]);
    const [searchValue, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [value, setValue] = useState([])
    //const [value2, setValue2] = useState([])

    const [OrderIdValue, setOrderIdValue] = useState('')

    const onChange1 = (event) => {
        setSearch(event.target.value)

        console.log("filter", event.target.value)
        if (event.target.value == "All Orders") {

            console.log("else", event.target.value)
            setOrderResponse(value)
            console.log(value)
        }
        else if (event.target.value != '') {
            console.log(OrderResponse.OrderStatus, typeof(value.OrderStatus), typeof(event.target.value))
            let filter_1 = value.filter(res => res.OrderStatus != null && res.OrderStatus == event.target.value);
            console.log("orderFil", filter_1)
            setOrderResponse(filter_1);

        }
        else{
            <h1>No Pending Orders</h1>
        }

    }

    useEffect(async () => {
        console.log("in customer order")

        const RestaurantId = localStorage.getItem("RestaurantId")

        console.log("rest Id", RestaurantId)

        const response = await axios.get(`${backendServer}/restaurant/Orders/${RestaurantId}`)
        dispatch(RestaurantOrder(response.data))
        //console.log("restaurant orders",response.data['orders'].slice(1,2))

        setOrderResponse(response.data)
        setCustomerDet(response.data.customer)
        setValue(response.data)
        
        //const data1 = OrderResponse[0].DeliveryType; 
    }, [])
   
    
    console.log("this works",customerDet)
    
    // pop up code

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = ( parameter1) =>  (event) => {
        setAge(event.target.value || '');
       // setOrderId(parameter1)
        console.log("event value", event.target.value)

       // console.log("ORder id", OrderIdValue)
      
        
    };


    const handleClickOpen = (param1) => () => {
        setOpen(true);
        setOrderIdValue(param1)
        console.log("OrderIdValue", param1)
      
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }

        const RestaurantId = localStorage.getItem("RestaurantId")
        console.log("index response", OrderResponse)
        const idx = OrderResponse.findIndex(item=>item.OrderId==OrderIdValue);
        console.log("idx value", idx)
        OrderResponse[idx].OrderStatus = age;
        const response =   axios.post(`${backendServer}/restaurant/orders/${OrderIdValue}/${age}`
        ).then((response) =>{
            console.log(response)
        })
        .catch((err) =>{
            console.log(err)
        })
       

    };

    //pop up code

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const viewCustomer = (ID) =>{
        
        sessionStorage.setItem("TempCustomerId", ID)
        history.push("/RestaurantCustomerView")
    }


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
            <Navbar handleBtnChange={onChange1} />
            <h2 style={{
                display: "flex",
                paddingTop: "20px",
                justifyContent: "center",
                alignItems: "center"
            }}>Your Customer Orders</h2>
            <div style={{
                display: "flex",
                paddingTop: "80px",
                justifyContent: "center",
                alignItems: "center"
            }}>

<TableContainer component={Paper} style={{ width: 1000 }}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer Details</StyledTableCell>
            <StyledTableCell align="center">Last Updated Time</StyledTableCell>
            <StyledTableCell align="center">Order Type</StyledTableCell>
            <StyledTableCell align="center">Order Status</StyledTableCell>
            <StyledTableCell align="center">Edit Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? OrderResponse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : OrderResponse
          ).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar align="center" alt="Remy Sharp" src={row.ImageUrl} ></Avatar>{row.CustomerName}
              </TableCell>
              <TableCell align="center"><Button onClick={() => viewCustomer(row.CustomerId)}>View</Button></TableCell>
              <TableCell align="center">{row.LastUpdatedTime}</TableCell>
              <TableCell align="center">{row.DeliveryType}</TableCell>
              <TableCell align="center">{row.OrderStatus}</TableCell>
              <TableCell align="center"> 
              <Button onClick={handleClickOpen(row.OrderId)}>Edit Order</Button>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Update Order Status</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl sx={{ m: 1, minWidth: 420 }}>
                                            <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
                                            <Select
                                                native
                                                value={age}
                                                onChange={handleChange( row.OrderId)}
                                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                            >

                                                <option aria-label="None" value="" />
                                                <option value="Order Received">Order Received</option>
                                                <option value="Preparing">Preparing</option>
                                                <option value="On The Way">On The Way</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Pick Up Ready">Pick Up Ready</option>
                                                <option value="Picked Up">Picked Up</option>
                                                <option value="Cancel Order">Cancel Order</option>

                                            </Select>
                                        </FormControl>

                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
              </TableCell>
              
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter align="right">
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2,5,10]}
              colSpan={3}
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
      </Table>
    </TableContainer>



                {/* <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }}>
                   {OrderResponse.map((card) => ( 
                    <>
                        <ListItem key={3} alignItems="flex-center" >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={card.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={card.CustomerName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {card.OrderId}
                                        </Typography>
                                        {" ", card.OrderStatus}
                                    </React.Fragment>
                                }
                            />
                            <Button onClick={handleClickOpen(card.OrderId)}>Edit Order</Button>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Update Order Status</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl sx={{ m: 1, minWidth: 420 }}>
                                            <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
                                            <Select
                                                native
                                                value={age}
                                                onChange={handleChange( card.OrderId)}
                                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                            >

                                                <option aria-label="None" value="" />
                                                <option value="Order Received">Order Received</option>
                                                <option value="Preparing">Preparing</option>
                                                <option value="On The Way">On The Way</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Pick Up Ready">Pick Up Ready</option>
                                                <option value="Picked Up">Picked Up</option>

                                            </Select>
                                        </FormControl>

                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>

                        </ListItem>

                        <Divider variant="middle" component="li" padding="20px" />
                    </>
                     ))} 


                </List> */}



            </div>
        </>

    );

}

export default RestaurantOrder;