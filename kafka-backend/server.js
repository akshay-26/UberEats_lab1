var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Orders = require('./services/Orders/Orders');
var RestOrders = require("./services/Orders/RestOrders")
var ReceiptOrder = require("./services/Orders/ReceiptOrder")
var DeliveryAddress = require("./services/DeliveryAddress/DeliveryAddress")
var AddDishes = require("./services/Dishes/AddDishes")
var GetDeliveryAddress = require("./services/DeliveryAddress/GetDeliveryAddress")
var GetRestDishes = require("./services/Dishes/GetRestDishes")
var GetDishes = require("./services/Dishes/GetDishes")
var GetOneDish = require("./services/Dishes/GetOneDish")
var GetAllDish = require("./services/Dishes/GetAllDish")
var PostFav = require("./services/Favourites/PostFav")
var GetFav = require("./services/Favourites/GetFav")
var GetRestaurant = require("./services/Restaurant/GetRestaurant")
var GetUser = require("./services/UserProfile/GetUser")
var PostUser = require("./services/UserProfile/PostUser")
var GetRestaurantProfile = require("./services/UserProfile/GetRestaurantProfile")
var PostRestaurant = require("./services/UserProfile/PostRestaurant")
const mongoose = require("mongoose")

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.hkqfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
   
      console.log("DB and Server connected");
    
  });


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    console.log("server js msg")
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        console.log("fname handle", data)
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("Orders",Orders)
handleTopicRequest("RestOrders", RestOrders)
handleTopicRequest("ReceiptOrder",ReceiptOrder)
handleTopicRequest("DeliveryAddress",DeliveryAddress)
handleTopicRequest("AddDishes",AddDishes)
handleTopicRequest("GetDeliveryAddress",GetDeliveryAddress)
handleTopicRequest("GetRestDishes",GetRestDishes)
handleTopicRequest("GetDishes",GetDishes)
handleTopicRequest("GetOneDish",GetOneDish);
handleTopicRequest("GetAllDish",GetAllDish);
handleTopicRequest("PostFav",PostFav)
handleTopicRequest("GetFav",GetFav)
handleTopicRequest("GetRestaurant", GetRestaurant)
handleTopicRequest("GetUser", GetUser)
handleTopicRequest("PostUser", PostUser)
handleTopicRequest("GetRestaurantProfile", GetRestaurantProfile)
handleTopicRequest("PostRestaurant", PostRestaurant)
