import { combineReducers,createStore,applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentUser from './redux/currentUser';
import users from './redux/users';

const reducer = combineReducers({ currentUser,users });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;