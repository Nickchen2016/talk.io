import io from 'socket.io-client';
import store, { fetchStatus } from './redux/status';

const socket = io(window.location.origin);

socket.on('connect', ()=> {
    console.log('connected to the server!');

    
})