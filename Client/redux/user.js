import axios from 'axios';

// action types

const GET_USER = 'GET_USER';

// action creators

const getUser = user => ({ type: GET_USER, user });
// const removeCurrentUser = () =>({ type: REMOVE_CURRENT_USER });

// Thunk creators

  export const fetchUser = (credentials)=> dispatch=> {
    axios.put('/api/users', credentials)
      .then(res => dispatch(getUser(res.data)));
  }

// Reducer

export default function reducer (user = [], action) {
    switch (action.type) {
      case GET_USER:
        return action.user;
      default:
        return user;
    }
  }