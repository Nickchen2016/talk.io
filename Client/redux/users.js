import axios from 'axios';

// action types

const GET_USERS = 'GET_USERS';

// action creators

const getUsers = users => ({ type: GET_USERS, users });
// const removeCurrentUser = () =>({ type: REMOVE_CURRENT_USER });

// Thunk creators

  export const fetchUsers = ()=> dispatch=> {
    axios.get('/api/users')
      .then(res => dispatch(getUsers(res.data)));
  }

// Reducer

export default function reducer (allUsers = [], action) {
    switch (action.type) {
      case GET_USERS:
        return action.users;
      default:
        return allUsers;
    }
  }