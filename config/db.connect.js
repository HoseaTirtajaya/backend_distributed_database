const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://extillius:W67oSB1oZHo46pnn@cluster0.a7wze.mongodb.net/distributeddatabase?retryWrites=true&w=majority"
// const mongoUri = "mongodb://localhost:27017/test-grist"

function dbConnect() {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('We connected to mongoose')
    });
}

module.exports = dbConnect;