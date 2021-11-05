var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Orders = require('./services/Orders');
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
