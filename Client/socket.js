import io from 'socket.io-client';
import { fetchStatus } from './redux/status';
import store from './store';

// const socketIo = value => {
    const socket = io(window.location.origin);

    socket.on('connect', ()=> {
        console.log('connected to the server!');

        socket.on('contact status', status => {
            // console.log('got ' + JSON.stringify(status) + ' back!!!!!!');
            store.dispatch(fetchStatus(status));
        })

    // socket.emit('my status', value);
    })

    // socket.on('disconnect', function(socket){
    //     console.log('sad it cut off:(')
    // })
// }

export default socket;