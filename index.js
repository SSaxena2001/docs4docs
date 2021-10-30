const express = require('express');
const app = express();
const mongoose = require("mongoose");
const server = require('http').Server(app);
const socketIO = require('socket.io');
const { v4: uuidV4 } = require('uuid');
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cookieParser());
mongoose.connect(
    "mongodb+srv://admin-ieeecas:ieeecasmongodb@cluster0.yozy1.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.connection.once("open", () => {
    console.log("connected to MONGO");
  });


const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get('/', (req, res) => {
    res.render('login');
})


app.get('/chat', function(req, res) {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:roomId/chat', function(req, res) {
    res.render('chat', {roomId: req.params.roomId});
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});