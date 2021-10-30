
function socket(io) {
    io.on('connection', (socket) => {
        socket.on('joined-user', (data) => {
            var user = {};
            user[socket.id] = data.username;
            
            socket.join(data.roomId);
            io.to(data.roomId).emit('joined-user', { username: data.username });
            io.to(data.roomId).emit('online-users', getUsers(users[data.roomId]));
        });

       
    });
}