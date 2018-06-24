module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log(`A socket connection to the server has been made: ${socket.id}`)

        socket.on('my id', value=> {
            console.log('----------------', value);
            socket.broadcast.emit('contact ownId', value);
        });
    socket.on('disconnect', function(socket){
        console.log('sad it cut off:(')
    })
    })
}