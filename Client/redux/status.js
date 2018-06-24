import socket from '../socket';
import axios from 'axios';
// action types

const FETCH_VALUE = 'FETCH_VALUE';

// action creators

export function fetchId(value) {
    const action = { type: FETCH_VALUE, value };
    return action;
}

//Thunk



// Reducer

export default function reducer (initialId = '', action) {
    switch (action.type) {
      case FETCH_VALUE:
        return action.value;
      default:
        return initialId;
    }
  }