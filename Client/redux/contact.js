import axios from 'axios';
import { fetchCurrentUser } from './currentUser';

// action types

const   ADD_CONTACT = 'ADD_CONTACT';
const   REMOVE_CONTACT = 'REMOVE_CONTACT';

// action creators

const addContact = contact => ({ type: ADD_CONTACT, contact });
const removeContact = contact => ({ type: REMOVE_CONTACT, contact });

// Thunk creators

  export const addNewContact = (credentials)=> dispatch=> {
    axios.post('/api/contact', credentials)
      .then(res => {dispatch(addContact(res.data))
                    dispatch(fetchCurrentUser())});
  }

  export const removeExistContact = (credential) => dispatch => {
    axios.delete(`/api/contact/${credential}`)
    .then( res => {dispatch(removeContact(res.data))
                   dispatch(fetchCurrentUser())});
  }

// Reducer

export default function reducer (contacts = [], action) {
    switch (action.type) {
      case ADD_CONTACT:
        return action.contact;
      default:
        return contacts;
    }
  }