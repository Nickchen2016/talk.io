import socket from '../socket';
import axios from 'axios';
// action types

const FETCH_VALUE = 'FETCH_VALUE';
// const FIRST_STATUS = 'FIRST_STATUS';

// action creators

    const contactStatus = contact => ({ type: FETCH_VALUE, contact });
    // const firstStatus = status => ({ type: FIRST_STATUS, status });

//Thunk

export const getCurrentUser = (value)=> dispatch=> {
  axios.get('/api/me')
    .then(res=> res.data.contacts.filter(c => c.ownId==value.id)[0])
    .then( contact => {
      if(contact) {axios.get(`/api/users/${contact.ownId}`)
                    .then(res => dispatch(contactStatus(res.data)))}
    })
}

// export const initialStatus = (credential) => dispatch => {
//   axios
// }

// Reducer

export default function reducer (initialState={}, action) {
    switch (action.type) {
      case FETCH_VALUE:
        return action.contact;
      default:
        return initialState;
    }
  }