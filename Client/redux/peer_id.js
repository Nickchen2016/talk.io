// action types

const PEER_ID = 'PEER_ID';

// action creators

export const fetchPeerId = id => ({ type: PEER_ID, id });


// Reducer

export default function reducer (initialState='', action) {
    switch (action.type) {
      case PEER_ID:
        return action.id;
      default:
        return initialState;
    }
  }