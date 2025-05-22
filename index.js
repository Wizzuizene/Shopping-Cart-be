const http = require("http");
const app = require('./app');
const connectDB = require('./src/config/db');
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8081;

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});