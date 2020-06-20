import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './Signup';
import Login from './Login';
import Sidebar from './Sidebar';
import { fetchCurrentUser } from '../redux/currentUser';

const Root = (props) => {

    useEffect(()=>{
      props.fetchInitialData();
    },[])

        return (
           <Router>
               <div>
                       <Route exact path="/" component={Signup} />
                       <Route exact path="/login" component={Login} />
                       <Route exact path="/sidebar" component={Sidebar} />
               </div>
           </Router> 
        );
}

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
	dispatch(fetchCurrentUser())
  }
});

export default connect(mapState, mapDispatch)(Root);