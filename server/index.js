const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const { v4: uuidV4 } = require('uuid');


app.set('view engine', 'ejs');
app.use(express.static('public'));


const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


app.get('/', function(req, res) {
    res.redirect(`/${uuidV4()}`);
});

app.get('/chat', function(req, res) {
    res.render('chat');
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});