const mongoose = require('mongoose');

const mongoUri = process.env.mongoURI;
// const mongoUri = "mongodb://localhost:27017/test-grist"

function dbConnect() {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('We connected to mongoose')
    });
}

module.exports = dbConnect;