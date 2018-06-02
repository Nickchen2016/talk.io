import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            users : []
        }
    }

    componentDidMount(){
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => this.setState({users}))
            .catch(err => console.log(err))
    }


    render() {
        return(
            <ul>
                {this.state.users.map(user=><li key={user.id}>{user.name}</li>)}
            </ul>
        )
    }
}