import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Min from './Min';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <div id="main">
                  {/* <Switch> */}
                    <Route exact path="/" component={Signup}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/min" component={Min}/>
                  {/* </Switch> */}
                </div>
            </Router>
        )
    }
}