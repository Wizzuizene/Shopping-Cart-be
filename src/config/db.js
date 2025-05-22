const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tranduydat19082003:sIxA8ZQsdApShjCb@appbanhang.ew05mt4.mongodb.net/?retryWrites=true&w=majority&appName=AppBanHang", {
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);  // Exit process with failure
    }
};

module.exports = connectDB;
