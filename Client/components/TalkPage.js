import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';

class Talkpage extends Component{
    constructor(props){
        super(props);
    }
 
    render() {
        // console.log('----------', this.state.delete);
        return(
            <div id='camera'>
                <Webcam
                    className='it' 
                //    height={800}
                //    width={1000}
                />
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Talkpage);