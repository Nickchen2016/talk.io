// action types

const PEER_ID = 'PEER_ID';
const REMOVE_ID = 'REMOVE_ID';

// action creators

export const fetchPeerId = id => ({ type: PEER_ID, id });
export const deleteId = () => ({ type: REMOVE_ID })

// Reducer

export default function reducer (initialState='', action) {
    switch (action.type) {
      case PEER_ID:
        return action.id;
      case REMOVE_ID:
        return '';
      default:
        return initialState;
    }
  }