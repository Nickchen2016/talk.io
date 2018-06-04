'use strict';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Min from './Min';

export default class Root extends Component {

    render(){
        return (
           <Router>
               <div>
                       <Route exact path="/" component={Signup} />
                       <Route exact path="/login" component={Login} />
                       <Route exact path="/min" component={Min} />
                       {/* <Route component={Signup} /> */}
               </div>
           </Router> 
        );
    }
}