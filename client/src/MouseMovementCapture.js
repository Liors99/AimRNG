import { io } from "socket.io-client";

const SAMPLE_RATE = process.env.REACT_APP_SAMPLE_RATE;

const socket = io(process.env.REACT_APP_SERVER_ADDRESS);

let lastMousePos = {
    x: 0,
    y: 0
};

document.onmousemove = function (e) {
    var event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
}

function mousemov() {
    const current_x = window.mouseX;
    const current_y = window.mouseY;
    let angle;

    if (current_x === lastMousePos.x) {
        angle = Math.PI / 2;
    }
    else {
        angle = (Math.atan(Math.abs((current_y - lastMousePos.y) / (current_x - lastMousePos.x))));
    }

    angle = angle / (Math.PI / 2);

    lastMousePos.x = window.mouseX;
    lastMousePos.y = window.mouseY

    if (angle !== 1) {
        sendToServer(angle);
    }


}


const sendToServer = (last_angle) => {
    socket.emit('Entry', last_angle);

}

export const getMousePos = () => {
    window.onload = function () {
        setInterval(mousemov, SAMPLE_RATE);
    }
}
