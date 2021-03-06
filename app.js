if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
  require('dotenv').config();
};

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const server = require('http').createServer(app);

//db.connect
require('./config/db.connect')();

//app.use
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors({}))


//app.use Router
app.use(require('./routes'));

//app.use error handler
app.use(require('./middlewares/errHandler'));

//Listening
server.listen(PORT, () => console.log('Server started on ' + PORT));



