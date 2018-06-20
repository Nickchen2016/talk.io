import axios from 'axios';
import socket from '../socket';

// action types

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

// action creators

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user });
const removeCurrentUser = () =>({ type: REMOVE_CURRENT_USER });

// Thunk creators

export const login = (credentials) => dispatch => {
    axios.put('/api/me', credentials)
         .then(res => { 
               dispatch(setCurrentUser(res.data));
               socket.emit({email: res.data.email, status: 'rgb(102,255,153)'})
          });
  };
  export const signup = (credentials) => dispatch => {
    axios.post('/api/me', credentials)
         .then(res => {
               dispatch(setCurrentUser(res.data));
               socket.emit({email: res.data.email, status: 'rgb(102,255,153)'})
          });
  };

  export const fetchCurrentUser = ()=> dispatch=> {
    axios.get('/api/me')
      .then(res=> dispatch(setCurrentUser(res.data)))
  }

  export const logout = ()=> dispatch =>{
    axios.delete('/api/me')
    .then(()=> dispatch(removeCurrentUser()));
  }

// Reducer

export default function reducer (currentUser = {}, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return action.user;
      case REMOVE_CURRENT_USER:
        return {};
      default:
        return currentUser;
    }
  }