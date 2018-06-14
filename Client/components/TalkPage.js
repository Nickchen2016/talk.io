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
                    className='webcam'  
                />
                <div id='controlButtons'>
                    <span><img src='./img/mute.png'/></span>
                    <span><img src='./img/screenshoot.png'/></span>
                    <span><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Talkpage);