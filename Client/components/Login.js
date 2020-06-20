import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/currentUser';
 

const Login = (props) => {

    const onLoginSubmit = (event) => {
        event.preventDefault();
        props.login({
                email: event.target.email.value,
                password: event.target.password.value,
        });
        props.history.push('/sidebar');
    }
         
        return(

            <div className="container">
                <div className="item1">
                    <img src="./img/logo.png" id="logo"/>
                </div>
                <div className="item2">
                    <div>
                        <div>
                            <form onSubmit={onLoginSubmit}>
                                <div id="table">
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
                                        <img src="./img/google.png" className='icon'/>
                                        <span id="line"></span>
                                        <span id="word">{props.message} with Google</span>
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

const mapState = (state)=>({message:'Login', loggedUser: state.currentUser});
const mapDispatch = (dispatch)=>({
    login: credentials => dispatch(login(credentials))
});

export default connect(mapState,mapDispatch)(Login);