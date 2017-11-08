var express = require("express");
var login = require('./routes/loginroutes');
var api = require('./routes/apiroutes');
var patient = require('./routes/patientroutes');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:'dhiraj',
                resave: true,
                saveUninitialized: true}));

app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/style',  express.static(__dirname + '/style'));

app.get('/',function(req,res){
    res.sendFile('home.html',{'root': __dirname + '/templates'});
})

app.get('/showSignInPage',function(req,res){
    res.sendFile('signin.html',{'root': __dirname + '/templates'});
})

app.get('/patients',function(req,res){
  res.sendFile('patients.html',{'root':__dirname + '/templates'})
})

app.get('/error',function(req,res){
  res.sendFile('error.html',{'root':__dirname + '/templates'})
})

app.get('/newPatient',function(req,res){
  res.sendFile('newPatient.html',{'root':__dirname + '/templates'})
})

app.post('/login', login.login);
app.get('/patient',patient.patient);
app.post('/register', patient.register);
app.post('/loginapi',api.login);
app.post('/surveyapi',api.survey);


// Binding express app to port 5000
app.listen(5000,function(){
    console.log('Node server running @ http://localhost:5000')
});
