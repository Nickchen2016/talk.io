import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { signup } from '../redux/currentUser';
import colorConfig from './Color';


class Signup extends Component {
    constructor(props){
        super(props)
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
    }

    onSignupSubmit(event) {
        event.preventDefault();
        // console.log(this.props.history.push('/min'),colorConfig(),'=======', event.target.email.value);
        this.props.signup({
            color: colorConfig(),
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        });
        this.props.history.push('/min');
        // axios.post('/api/me', {
        //     color: colorConfig(),
        //     name: event.target.name.value,
        //     email: event.target.email.value,
        //     password: event.target.password.value
        // }).then(res=>{
        //     if(res)this.props.history.push('/min');
        // })
        // .catch(console.error);
    }


    render() {
        return(

            <div className="container">
                <div className="item1">
                    <img src="./img/logo.png" id="logo"/>
                </div>
                <div className="item2">
                    <div>
                        <div>
                            <form onSubmit={this.onSignupSubmit}>
                                <div id="table">
                                    <input name="name" type="text" placeholder="Name" required/>
                                    <input name="email" type="email" placeholder="Email" required/>
                                    <input name="password" type="password" placeholder="Password" required/>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <div>
                            <h1>Or</h1>
                        </div>
                        <div>
                            <div id="google-icon">
                                <a
                                    // target="_self"
                                    href="/auth/google"
                                    id="google-btn">
                                        <img src="./img/google.png" id="icon"/>
                                        <span id="line"></span>
                                        <span id="words">{this.props.message} with Google</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item3">
                    <div>
                        <a href="/">
                            <span className="dot"></span>
                            <p>Sign up</p>
                        </a>
                        <a href="/login">
                            <span className="dot"></span>
                            <p>Log in</p>
                        </a>
                    </div>
                </div>
                
            </div>
        )
    }
}

// Container
const mapState = () => ({ message: 'Sign up' });
const mapDispatch = (dispatch) =>({
  signup: credentials => dispatch(signup(credentials))
});

export default connect(mapState, mapDispatch)(Signup);