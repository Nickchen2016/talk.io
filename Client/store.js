import { combineReducers,createStore,applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentUser from './redux/currentUser';
import user from './redux/user';
import status from './redux/status';

const reducer = combineReducers({ currentUser,user, status });

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;