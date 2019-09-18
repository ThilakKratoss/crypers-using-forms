const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();


//view engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');


//static folder
app.use('/public',express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());



app.get('/',(req,res) =>{
    res.render('skillrack');
});


app.post('/send',(req,res) =>{
  
    const output = '<p>You had a new Client request</p><h3>Cient Details<h3><ul><li>Name:${req.body.name}</li><li>Department:${req.body.department}</li><li>Email:${req.body.email}</li><li>Phone:${req.body.phone}</li></ul>'
    
    let firebase=require("firebase")
    var nodemailer = require('nodemailer');
        var config = {
            apiKey: "AIzaSyCNDCIRa0D2aYdMLbv7b5K7VqohlcOOm7I",
            authDomain: "crud-b4de3.firebaseapp.com",
            databaseURL: "https://crud-b4de3.firebaseio.com",
            projectId: "crud-b4de3",
            storageBucket: "crud-b4de3.appspot.com",
            messagingSenderId: "161721117806"
        };
        firebase.initializeApp(config);
    
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
          user: 'vinod.looser00@gmail.com',
          pass: 'vinoth1080'
        }
      });
    
    var iteration=1;
    
      var ref = firebase.database().ref("request/");
      ref.on("value", function(snapshot) {
        //  console.log(snapshot.val())
          var data=snapshot.val()
          for (key in data)
          console.log(data[key])
        var mailOptions = {
            from: 'vinod.looser00@gmail.com',
            to: 'vinod.aadvik@gmail.com,thilakal9299@gmail.com ',
            subject: 'new request',
            text: "name:"+snapshot.val().name+" \nphone no:"+snapshot.val().phone+" \n department :"+snapshot.val().department+" \nemail:"+snapshot.val().mail
          }
          iteration=iteration+1;
          if(iteration>1){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              iteration=iteration+1;
            }
          });
        }
     }, function (error) {
        console.log("Error: " + error.code);
     });
   
});

app.listen(3000,()=>{
    console.log("server started");
});