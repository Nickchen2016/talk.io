import React, { Component } from 'react';
import { connect } from 'react-redux';

class Talkpage extends Component{
    constructor(props){
        super(props);
    }
 
    render() {
        // console.log('----------', this.state.delete);
        return(
            <div>

                <h3>Hello World!!</h3>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Talkpage);