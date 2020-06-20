import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/currentUser';
import colorConfig from '../../Public/color';


const Signup =(props)=> {

    const onSignupSubmit = (event) => {
        event.preventDefault();
        props.signup({
            color: colorConfig(),
            name: event.target.name.value.replace(/^\s|\s$/g, '').split(' ').map(name=> name=name[0].toUpperCase()+name.slice(1)).join(' '),
            email: event.target.email.value,
            password: event.target.password.value,
            status: 'rgb(102,255,153)'
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
                            <form onSubmit={onSignupSubmit}>
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

// Container
const mapState = () => ({ message: 'Sign up' });
const mapDispatch = (dispatch) =>({
  signup: credentials => dispatch(signup(credentials))
});

export default connect(mapState, mapDispatch)(Signup);