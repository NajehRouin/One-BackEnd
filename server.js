let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');
    const userController=require('./ControllersAdmin/users.controller')
    const domaineController=require('./ControllersAdmin/type.domaine.controller')
    const bureauController=require('./ControllersAdmin/bureau.controller')
    const abonnementController=require('./ControllersAdmin/abonnement.controller')
    const api = require('./routes/memberone.routes')
    const listTransaction=require('./routes/listeTransaction.routes');
    
    var path = require('path');
 const img=require("./routes/image.routes")
    function connect_To_DataBase(){
           mongoose.Promise = global.Promise;
        mongoose.connect(dbConfig.db, {
            useNewUrlParser: true
        }).then(() => {
            console.log('Database sucessfully connected')
        },
            error => {
                console.log('Database could not be connected: ' + error)
            }
        )
    }


    const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/user',userController)
app.use('/domaine-type',domaineController)
app.use('/bureau',bureauController)
app.use('/abonnement',abonnementController)
app.use("/public", express.static(__dirname +'/public'));
app.use(express.static('/public'));
app.use('/api', api)
app.use('/transaction',listTransaction)
app.use('/img',img)
app.set("view engine", "ejs");
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    connect_To_DataBase();
    console.log('Connected to port ' + port)
})
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});