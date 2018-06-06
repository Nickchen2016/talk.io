'use strict';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './Signup';
import Login from './Login';
import TalkPage from './TalkPage';
import { fetchUsers } from '../redux/users';
import { fetchCurrentUser } from '../redux/currentUser';

class Root extends Component {

    componentDidMount() {
		this.props.fetchInitialData();
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

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
	dispatch(fetchCurrentUser())
  }
});

export default connect(mapState, mapDispatch)(Root);