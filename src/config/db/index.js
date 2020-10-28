const mongoose = require('mongoose');


async function connect (){
    try {
        console.log('connect success');
        await mongoose.connect('mongodb://localhost:27017/f8_dev', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.log('connect failure');
    }
}

module.exports = {connect};