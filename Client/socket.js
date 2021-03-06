import io from 'socket.io-client';
import { getCurrentUser } from './redux/status';
import store from './store';
import { fetchInvitationKey } from './redux/invitation';
import { fetchPeerId } from './redux/peer_id';
import { fetchInviterInfo } from './redux/inviterInfo';

// const socketIo = value => {
    const socket = io(window.location.origin);

    socket.on('connect', ()=> {
        console.log('connected to the server!');

        socket.on('contact ownId', value => {
            store.dispatch(getCurrentUser(value));
        })

        socket.on('chat_invitation', value=> {
            console.log('+++++ chat_invitation +++++', value)
            store.dispatch(fetchInvitationKey(value));
            store.dispatch(fetchInviterInfo({inviter:value.inviter, inviter_color:value.inviter_color}));
            store.dispatch(fetchPeerId(value.peer_id));
        })
        socket.on('reject_invitation', value => {
            console.log('++++ reject invitation ++++', value)
            store.dispatch(fetchInvitationKey(value));
        })
        socket.on('confirm_invitation', value => {
            console.log('++++ confirm _invitation peerId ++++', value)
            store.dispatch(fetchPeerId(value));
        })

    })


export default socket;