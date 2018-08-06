// action types

const INVITATION_KEY = 'INVITATION_KEY';
const REJECT_KEY = 'REJECT_KEY'

// action creators

export const fetchInvitationKey = val => ({ type: INVITATION_KEY, val });
export const rejectInvitationKey = () => ({ type: REJECT_KEY });


// Reducer

export default function reducer (initialState='', action) {
    switch (action.type) {
      case INVITATION_KEY:
        return action.val;
      case REJECT_KEY:
        return '';
      default:
        return initialState;
    }
  }