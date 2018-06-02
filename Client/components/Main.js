import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : [123]
        }
    }

    componentDidMount(){
        // axios.get('/')

    }


    render() {
        return(
            <ul>
                {this.state.user}
            </ul>
        )
    }
}


module.exports = Main;