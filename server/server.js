const express = require('express');
const cors = require('cors');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//For Socket.io
const http = require("http").createServer(app);
const io = exports.io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
});


app.use(cors());
app.use(express.json());


http.listen(port, () => {
    console.log("Listening on port " + port);
});