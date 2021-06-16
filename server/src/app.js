const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(cors());

//middleware
//morgan es para ver en la consola las llamadas que se 
//hacen al backend
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Routes
const usersRoutes = require('./routes/user');


const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);

mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://localhost/MEAN-user', { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: 'MEAN-user-database',
  useFindAndModify: false
})
.then(() => {
  console.log('Database conecction is ready');
})
.catch((error) => {
  console.log(error);
})

app.listen(process.env.PORT || 3030, () => {
  console.log('server is running http://localhost:3030');
});