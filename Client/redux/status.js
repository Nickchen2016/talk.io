import socket from '../socket';
import axios from 'axios';
import { fetchCurrentUser } from './currentUser';
// action types

const FETCH_VALUE = 'FETCH_VALUE';

// action creators

    const contactStatus = contact => ({ type: FETCH_VALUE, contact });

//Thunk

export const getCurrentUser = (value)=> dispatch=> {
  
  axios.get('/api/me')
    .then(res=> res.data.contacts.filter(c => c.ownId==value.id)[0])
    .then( contact => {if(contact) dispatch(fetchCurrentUser())}
  )}


// Reducer

export default function reducer (initialState={}, action) {
    switch (action.type) {
      case FETCH_VALUE:
        return action.contact;
      default:
        return initialState;
    }
  }