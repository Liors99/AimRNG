const io = require('./server.js').io;

const MAX_ANGLES_NUM = 128;

let all_angles = [];

io.on('connection', (socket) => {
    //console.log(socket);
    socket.on('Entry', (angle) => {
        addToAngleStack(angle);
    });
});


const addToAngleStack = (angle) => {
    //If stack is full, remove the last element
    if (all_angles.length === MAX_ANGLES_NUM) {
        all_angles.shift();
    }

    all_angles.push(angle);

    console.log(all_angles);
}