
// action types

const FETCH_STATUS = 'FETCH_STATUS';

// action creators

export function fetchStatus(status) {
    const action = { type: FETCH_STATUS, status };
    return action;
}


// Reducer

export default function reducer (initialStatus = 'rgb(102,255,153)', action) {
    switch (action.type) {
      case FETCH_STATUS:
        return action.status;
      default:
        return initialStatus;
    }
  }