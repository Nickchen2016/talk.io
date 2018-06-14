import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';

class Talkpage extends Component{
    constructor(props){
        super(props);
        this.state={
            audio: true,
            screenshot:'',
            img:''
        }
        this.audio= this.audio.bind(this);
        this.removePhoto= this.removePhoto.bind(this);
    }
 
        audio(){
            {this.state.audio===true?this.setState({audio: false}):this.setState({audio:true})}
        }

        removePhoto(){
            this.setState({screenshot:''})
        }

        setRef = (webcam) => {
            this.webcam = webcam;
          }
        capture = () =>{
            const imageSrc = this.webcam.getScreenshot();
            this.state.screenshot===''?this.setState({img:imageSrc, screenshot:'screenshot'}):this.setState({img:imageSrc, screenshot:'screenshot'})
        }

    render() {
        // console.log('----------', this.state.img);
        return(
            <div id='camera' className={this.props.active}>
                 <Webcam
                    className='webcam'
                    ref={this.setRef}
                    audio={this.state.audio} 
                    screenshotFormat="image/jpeg" 
                />

                {this.state.screenshot==='screenshot'?
                            <div id={this.state.screenshot}>
                                <img src={this.state.img} />
                                <span className='close' onClick={this.removePhoto}></span>
                            </div>:''}
                <div id='controlButtons'>
                    <span onClick={this.audio}><img src='./img/mute.png'/></span>
                    <span onClick={this.capture}><img src='./img/screenshoot.png'/></span>
                    <span><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Talkpage);