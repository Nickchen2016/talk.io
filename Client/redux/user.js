import axios from 'axios';

// action types

const CHANGE_USER = 'CHANGE_USER';

// action creators

const changeUser = user => ({ type: CHANGE_USER, user });
// const removeCurrentUser = () =>({ type: REMOVE_CURRENT_USER });

// Thunk creators

  export const changeUserInfo = (credentials)=> dispatch=> {
    axios.put(`/api/users/${credentials.id}`, {status: credentials.status})
      .then(res => dispatch(changeUser(res.data)));
  }

// Reducer

export default function reducer (user = [], action) {
    switch (action.type) {
      case CHANGE_USER:
        return action.user;
      default:
        return user;
    }
  }