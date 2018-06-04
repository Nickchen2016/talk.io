import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.onSignupSubmit = this.onSignupSubmit.bind(this);
    }

    // componentDidMount(){
    //     axios.get('/api/users')
    //         .then(res => res.data)
    //         .then(users => this.setState({users}))
    //         .catch(err => console.log(err))
    // }
    onSignupSubmit(event) {
        event.preventDefault();
        console.log('=======', event.target.email.value);
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
                                        <span id="words">Sign up with Google</span>
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