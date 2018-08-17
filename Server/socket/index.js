module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log(`*************A socket connection to the server has been made: ${socket.id}`)

        socket.on('my id', value=> {
            console.log('----------------', value);
            socket.broadcast.emit('contact ownId', value);
        });
        socket.on('peer_id', value=> {
        
                console.log('-----ID-----', value);
                socket.on('trans_info', val=> {
                    console.log('**** Here is my desire_id ****', val.guest_id);
                    val['peer_id']=value;
                    socket.broadcast.emit('chat_invitation', val);
                    socket.join(val.room);
                });
                socket.on('confirm', val => {
                    console.log('____ confirm Room ____', val)
                    socket.join(val.room);
                    socket.broadcast.to(val.room).emit('confirm_invitation', value);
                })
        })
        socket.on('reject', val=> {
            console.log('*** reject ***', val);
            socket.join(val.room);
            socket.broadcast.to(val.room).emit('reject_invitation', val);
        })
    socket.on('disconnect', function(socket){
        console.log('sad it cut off:(')
    })
    })
}