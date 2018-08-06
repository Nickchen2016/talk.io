import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import store from './store';
import Root from './components/Root';


render(
<Provider store={store}>
    <Root />
</Provider>, 
document.getElementById('root')
);