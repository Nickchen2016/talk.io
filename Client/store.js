import { combineReducers,createStore,applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentUser from './redux/currentUser';
import user from './redux/user';
import status from './redux/status';
import contact from './redux/contact';
import invitation from './redux/invitation';
import peer_id from './redux/peer_id';
import inviterInfo from './redux/inviterInfo';


const reducer = combineReducers({ currentUser, user, status, contact, invitation, peer_id, inviterInfo });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;