let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let swaggerJsDoc = require('swagger-jsdoc');
let swaggerUi = require('swagger-ui-express');

//swagger option
let swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
          title: 'Hello World', // Title (required)
          version: '1.0.0', // Version (required)
        },
      },
      // Path to the API docs
      apis: ['./App.js'],
}
let swaggerDocs =  swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));


// let Area = require('./api/models/areaModel');
let User = require('./api/models/userModel');
let Fail = require('./api/models/failModel')
let Car = require('./api/models/carModel')

// let Device = require('./api/models/deviceModel');

let morgan = require('morgan');
let cors = require('cors');

let port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
    next();
});

app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/trafficDB',{useNewUrlParser:true});
mongoose.set('useCreateindex',true);

app.get('/',function(req,res){
    res.send('Welcome to the home page!');
})






let users = require('./api/routes/userRoute');
users(app);
let fails = require('./api/routes/failRoute');
fails(app);
let cars = require('./api/routes/carRoute');
cars(app);

//////asdasdasd

/**
 * @swagger
 * /users:
 *  get: 
 *      description: get all users     
 *      responses:
 *          '200':
 *              description: A successfull              
 *              schema:
 *                  $ref : http://apismarttraffic.servehttp.com/users
 *          
 */



app.listen(port,()=>{
    console.log('start with port ' + port + '....' );
});
