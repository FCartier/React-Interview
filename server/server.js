const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    feed = require('./feed-server');

const app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

const port = 2000;
server.listen(port, () => console.log(`Listening on port *:${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/babel-standalone', express.static(path.join(__dirname, 'node_modules', 'babel-standalone')));

app.get('/', (req, res) => res.sendfile(path.join(__dirname, 'views', 'index.html')));

io.on('connection', (socket) => {
    console.log('User connected. Socket id %s', socket.id);

    socket.on('join', (rooms) => {
        console.log('Socket %s subscribed to %s', socket.id, rooms);
        if (Array.isArray(rooms)) {
            rooms.forEach(stock => socket.join(stock));
        } else {
            socket.join(rooms);
        }
    });

    socket.on('leave', (rooms) => {
        console.log('Socket %s unsubscribed from %s', socket.id, rooms);
        // create a race condition
        setTimeout(()=>{
            if (Array.isArray(rooms)) {
                rooms.forEach(stock => socket.leave(stock));
            } else {
                socket.leave(rooms);
            }
        }, 2000)
    });

    socket.on('disconnect', () => console.log('User disconnected. Socket id %s', socket.id));
});

feed.start((room, type, message) => io.to(room).emit(type, message));

module.exports = app;
