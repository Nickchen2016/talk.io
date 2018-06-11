import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';

class Talkpage extends Component{
    constructor(props){
        super(props);
    }
 
    render() {
        // console.log('----------', this.props.active);
        return(
            <div id='camera' className={this.props.active}>
                <Webcam
                    className='it'  
                />
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Talkpage);