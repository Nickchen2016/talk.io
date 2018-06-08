import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../redux/currentUser';
 

class Login extends Component {
    constructor(props){
        super(props)
        this.onLoginSubmit=this.onLoginSubmit.bind(this);
    }

    onLoginSubmit(event) {
        event.preventDefault();
        // this.name.value = '';
        // this.password.value = '';
        
    //     console.log('-------', event.target.email.value);
    //     axios.put('/api/me', {
    //         email: event.target.email.value,
    //         password: event.target.password.value
    //     }).then(console.log)
    //     .catch(console.error);
        this.props.login({
                email: event.target.email.value,
                password: event.target.password.value
        });
        this.props.history.push('/talkpage');
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
                            <form onSubmit={this.onLoginSubmit}>
                                <div id="table">
                                    <input name="email" type="email" placeholder="Email" required/>
                                    {/* ref={ el=> this.name = el } */}
                                    <input name="password" type="password" placeholder="Password" required/>
                                    {/* ref={ el=> this.password = el } */}
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
                                        <img src="./img/google.png" className='icon'/>
                                        <span id="line"></span>
                                        <span id="word">{this.props.message} with Google</span>
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

const mapState = (state)=>({message:'login'});
const mapDispatch = (dispatch)=>({
    login: credentials => dispatch(login(credentials))
});

export default connect(mapState,mapDispatch)(Login);