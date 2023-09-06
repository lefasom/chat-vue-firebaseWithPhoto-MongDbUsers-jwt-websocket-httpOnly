const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index')
const app = express()

const cors = require('cors')
app.name = 'backend'
routes.use(cookieParser())
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// server.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// app.get('/', (req, res) => {
//   res.cookie('miCookie', 'Hola desde mi cookie', { maxAge: 900000, httpOnly: true });
//   res.send('Cookie configurada correctamente');
// });
app.use(cors())
app.use('/', routes);


module.exports = app; 