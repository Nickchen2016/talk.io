import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

class Talkpage extends Component{

    constructor(props){
        super(props);
        this.state={
            audio: true,
            screenshot:'',
            img:'',
            activeDrags: 0
        }
        this.audio= this.audio.bind(this);
        this.removePhoto= this.removePhoto.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
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

        onStart() {
            this.setState({activeDrags: ++this.state.activeDrags});
          }
        
        onStop() {
            this.setState({activeDrags: --this.state.activeDrags});
          }

    render() {
        // console.log('----------', this.state.img);
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return(
            <div id='camera' className={this.props.active}>
                <Webcam
                    className='webcam'
                    ref={this.setRef}
                    audio={this.state.audio} 
                    screenshotFormat="image/jpeg" 
                />

                <Draggable bounds="parent" >
                    <div className="box">
                        <div id='contactToChat'>
                            <span style={{backgroundColor:'black'}}>
                                <span id='newCap'>N</span>
                            </span>
                            <span>Nick Chen</span>
                        </div>
                        <div id='loadingDots'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </Draggable>

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

const mapState =(state)=>({loggedUser:state.currentUser})

export default connect(mapState)(Talkpage);