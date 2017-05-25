var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();

var twilio = require('twilio');
var accountSid = '{{ account_sid }}'; // Your Account SID from www.twilio.com/console
var authToken = '{{ auth_token }}';   // Your Auth Token from www.twilio.com/console
var twilio_number = '{{ twilio_number }}';
// This enable when you create TWILIO Account
//var client = new twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


app.post('/api/sms-promotion',function (req, res) {
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify({"phone": req.body.phone}));
   var phone = req.body.phone;
   console.log("phone = "+phone);
   var hr = (new Date()).getHours();
   var body_msg = '';
   if (hr < 12){
      body_msg = "Good morning! Your promocode is AM123";
   }
   else{
      body_msg = "Hello! Your promocode is PM456";
   }
   console.log(body_msg);

   //  This enable when you create TWILIO Account
   /*
   twilio.messages.create({
   	body: body_msg,
    	to: req.body.phone,  // Text this number
    	from: twilio_number // From a valid Twilio number
   },function(err, message) {
   	if(err) {
        	res.send(JSON.stringify({report:"error"}));
    	}
        else{
               res.send(JSON.stringify({report:"success"}));
        }
   });
   */




})

var server = app.listen(8981, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})
