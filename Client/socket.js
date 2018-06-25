import io from 'socket.io-client';
import { getCurrentUser } from './redux/status';
import store from './store';
// import axios from 'axios';

// const socketIo = value => {
    const socket = io(window.location.origin);

    socket.on('connect', ()=> {
        console.log('connected to the server!');

        socket.on('contact ownId', value => {
            // console.log('***************', JSON.stringify(value));
            store.dispatch(getCurrentUser(value));
        })

    })

    // socket.on('disconnect', function(socket){
    //     console.log('sad it cut off:(')
    // })
// }

export default socket;