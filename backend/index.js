const express = require("express");
const http = require('http');
const socketIo = require("socket.io");

const app = express();


const httpServer = http.createServer(app);
const io = socketIo(httpServer, { cors: "*" });

const obj = {
    sockets: []
}
let s = 1;
let h = 17;
let direction = {
    x: 1,
    y: 0,
}
const body = [{ x: 1, y: 1 }];

const food = { x: 0, y: 0 };

io.on("connection", (socket) => {
    const { height, width } = socket.handshake.query;
    h = height;
    if (obj.sockets.length == 0) {
        obj.sockets.push({
            id: socket.id,
            framRatio: { start: 1, end: Number(width) }
        })
    }
    else {
        obj.sockets.push({
            id: socket.id,
            framRatio: { start: s, end: s + Number(width) }
        })
    }

    s = (s + Number(width));
})


setInterval(() => {
    if (obj.sockets.length) {
        body[0].x += direction.x;
        body[0].y += direction.y;
        if (body[0].x == (s - 1) && body[0].y == 1) {
            direction.x = 0;
            direction.y = 1;
        }
        if (body[0].x == (s - 1) && body[0].y == 13) {
            direction.x = -1;
            direction.y = 0;
        }
        if (body[0].x == 1 && body[0].y == 13) {
            direction.x = 0;
            direction.y = -1;
        }
        if (body[0].x == 1 && body[0].y == 1) {
            direction.x = 1;
            direction.y = 0;
        }
        obj.sockets.forEach(({ id, framRatio: { start, end } }) => {
            if (body[0].x >= start && body[0].x <= end) {
                io.to(id).emit("position", body);
            }
            else {
                io.to(id).emit("clear");
            }
        })
    }
}, 100);










httpServer.listen(8080);