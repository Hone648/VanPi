const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://192.168.1.51:27017/vanpi');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectToDB();

mongoose.connection.once('open', () => {
    console.log('Connected to Database')
})