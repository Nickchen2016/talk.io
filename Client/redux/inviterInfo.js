// action types

const INVITER_INFO = 'INVITER_INFO';
const REMOVE_INVITER = 'REMOVE_INVITER'

// action creators

export const fetchInviterInfo = value => ({ type: INVITER_INFO, value });
export const deleteInviter = () => ({ type: REMOVE_INVITER });

// Reducer

export default function reducer (initialState='', action) {
    switch (action.type) {
      case INVITER_INFO:
        return action.value;
      case REMOVE_INVITER:
        return '';
      default:
        return initialState;
    }
  }