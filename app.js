//require('./database')
require('dotenv').config();
const connectDB = require('./db/connect')
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.use(express.static('./public'));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

let routerAutos = require('./routes/autos')
let routerStock = require('./routes/stock')
let routerProveedores = require('./routes/proveedores')


app.use('/api/v1/autos', routerAutos);
app.use('/api/v1/stock', routerStock);
app.use('/api/v1/proveedores', routerProveedores);


//Middleware

app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


//******************************************** */
const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.DB_URI_LOCAL);
    console.log(`BBDD conectada ${process.env.DB_URI_LOCAL}`);

    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log("no hay conexion a datos");
  }
};

start();
