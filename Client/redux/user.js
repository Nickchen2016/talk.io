import axios from 'axios';
import { fetchCurrentUser } from './currentUser';

// action types

const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';
// const GET_USER = 'GET_USER';

// action creators

const changeUser = user => ({ type: CHANGE_USER_STATUS, user });
// const getUser = user =>({ type: GET_USER, user });

// Thunk creators

  export const changeUserInfo = (credentials)=> dispatch=> {
    axios.put(`/api/users/${credentials.id}`, {status: credentials.status})
      .then(res => {dispatch(changeUser(res.data.status))
                    dispatch(fetchCurrentUser())
                   });
  }

  // export const getUserInfo = (credential) => dispatch => {
  //   axios.get(`/api/users/${credential}`)
  //     .then(res => dispatch(getUser(res.data.status)));
  // }

// Reducer

export default function reducer (user = {changeUserStatus:'',getUserStatus:''}, action) {
    switch (action.type) {
      case CHANGE_USER_STATUS:
        return {...user,
                changeUserStatus:action.user};
      // case GET_USER:
      //   return {...user,
      //           getUserStatus:action.user};
      default:
        return user;
    }
  }