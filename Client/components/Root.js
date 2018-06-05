'use strict';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import TalkPage from './TalkPage';
import store from '../store';
import { fetchUsers } from '../redux/users';

export default class Root extends Component {

    componentDidMount(){
        store.dispatch(fetchUsers());
    }
    render(){
        return (
           <Router>
               <div>
                       <Route exact path="/" component={Signup} />
                       <Route exact path="/login" component={Login} />
                       <Route exact path="/talkpage" component={TalkPage} />
                       {/* <Route component={Signup} /> */}
               </div>
           </Router> 
        );
    }
}