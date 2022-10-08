const express = require ('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv=require('dotenv');
const db=require('./DBconnect')
const userController=require('../ControllersAdmin/users.controller')
const domaineController=require('../ControllersAdmin/type.domaine.controller')
const bureauController=require('../ControllersAdmin/bureau.controller')
const abonnementController=require('../ControllersAdmin/abonnement.controller')
var app = express () ;
dotenv.config();


server=app.listen(3000 , () => console.log('server started at port : 3000')) ; 
db


app.use(cors('*'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));




app.use('/user',userController)
app.use('/domaine-type',domaineController)
app.use('/bureau',bureauController)
app.use('/abonnement',abonnementController)
app.use('/public',express.static('public'))

