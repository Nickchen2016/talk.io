import io from 'socket.io-client';
import { getCurrentUser } from './redux/status';
import store from './store';
import { fetchInvitationKey } from './redux/invitation';
import { fetchPeerId } from './redux/peer_id';
import { fetchInviterInfo } from './redux/inviterInfo';
// import axios from 'axios';

// const socketIo = value => {
    const socket = io(window.location.origin);

    socket.on('connect', ()=> {
        console.log('connected to the server!');

        socket.on('contact ownId', value => {
            // console.log('***************', JSON.stringify(value));
            store.dispatch(getCurrentUser(value));
        })
        // socket.on('counter_id', value=> {
        //     store.dispatch(fetchPeerId(value));
        // })
        socket.on('chat_invitation', value=> {
            console.log('+++++++++', value)
            store.dispatch(fetchInvitationKey(value));
            store.dispatch(fetchInviterInfo({inviter:value.inviter, inviter_color:value.inviter_color}));
            store.dispatch(fetchPeerId(value.peer_id));
        })
        socket.on('reject_invitation', value => {
            console.log('++++ reject invitation ++++', value)
            store.dispatch(fetchInvitationKey(value));
        })
        socket.on('confirm_invitation', value => {
            console.log('++++ confirm peerId ++++', value)
            store.dispatch(fetchPeerId(value));
        })

    })

    // socket.on('disconnect', function(socket){
    //     console.log('sad it cut off:(')
    // })
// }

export default socket;