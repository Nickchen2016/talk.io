import axios from 'axios';
import { fetchCurrentUser } from './currentUser';

// action types

const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';

// action creators

const changeUser = user => ({ type: CHANGE_USER_STATUS, user });

// Thunk creators

  export const changeUserInfo = (credentials)=> dispatch=> {
    axios.put(`/api/users/${credentials.id}`, {status: credentials.status})
      .then(res => {dispatch(changeUser(res.data.status))
                    dispatch(fetchCurrentUser())
                   });
  }


// Reducer

export default function reducer (user = {changeUserStatus:'',getUserStatus:''}, action) {
    switch (action.type) {
      case CHANGE_USER_STATUS:
        return {...user,
                changeUserStatus:action.user};
      default:
        return user;
    }
  }