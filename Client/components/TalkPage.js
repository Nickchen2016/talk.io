import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
import PropTypes from 'prop-types';
import socket from'../socket';
import randomstring from 'randomstring';

class Talkpage extends Component{

    constructor(props){
        super(props);
        this.state={
            peer: new Peer(),
            my_id: '',
            peer_id: '',
            initialized: false,
            files: [],

            audio: true,
            screenshot:'',
            img:'',
            activeDrags: 0,
            videoSrc:{},
            stream:{},
            counter_stream: {},
            video: ''
        }
        this.handleVideo= this.handleVideo.bind(this);
        this.videoError= this.videoError.bind(this);
        this.capture= this.capture.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    componentWillMount(){
        this.state.peer.on('open', (id) => {
			console.log('My peer ID is: ' + id);
			this.setState({
				my_id: id,
				initialized: true
			});
        });
        
        this.state.peer.on('call', call=>{
            console.log('******Been called here*******', call);
            call.answer(this.state.stream)
            this.setState({call}, ()=>{
                this.state.call.on('stream', stream=>{
                    console.log('********I got stream from requestor********', stream)
                    this.setState({counter_stream: URL.createObjectURL(stream)});
                })
            })
        })

		// this.state.peer.on('connection', (connection) => {
		// 	console.log('someone connected');
		// 	console.log(connection);

		// 	this.setState({
		// 		conn: connection
		// 	}, () => {
		// 		this.state.conn.on('open', () => {
		// 			this.setState({
		// 				connected: true
        //             });
		// 		});
        //         this.state.conn.on('data', (data)=> console.log('Received ', data))

		// 	});
		// });
    }


    componentDidMount(){
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
            .then(this.handleVideo)
            .catch(this.videoError)
        }

    }

    handleVideo(stream){
        this.setState({stream});
        let videoSrc = URL.createObjectURL(stream);
        this.setState({ videoSrc });
        socket.emit('peer_id', this.state.my_id)
    }

    videoError(err){
    }

    componentWillUnmount(){
		this.state.peer.destroy();
    }

    capture(){
        console.log('Here is the counter id I got: ', this.props.counterId)
        let peer_id= this.props.counterId;
        this.setState({peer_id});

        var call = this.state.peer.call(peer_id, this.state.stream);
        this.setState({call}, ()=>{
            this.state.call.on('stream', stream=>{
                console.log('*********I got stream from the reciever********', stream)
                this.setState({counter_stream: URL.createObjectURL(stream)});
            })
        })
        // var connection = this.state.peer.connect(peer_id);

		// this.setState({
		//     conn: connection
		// }, () => {
		// 	this.state.conn.on('open', () => {
		// 		this.setState({
		// 			connected: true
        //         });
        //     this.state.conn.send('Hello world')
        //     });
        //     this.state.conn.on('data', (data)=> console.log('--------Received---------', data))
        //     // this.state.conn.on('data', this.onReceiveData);
        //     // this.state.conn.send('Hello world')
		// });

    }

        onStart() {
            this.setState({activeDrags: ++this.state.activeDrags});
          }
        
        onStop() {
            this.setState({activeDrags: --this.state.activeDrags});
          }

    render() {
        console.log('----------', this.state);
        // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return(
            <div id='camera' className={this.props.active}>

                <video id='localVideo' src={this.state.videoSrc} autoPlay='true'></video>
                {/* <form onSubmit={(event)=>{event.preventDefault(); this.setState({peer_id: event.target.peer_id.value}); socket.emit('peer_id', event.target.peer_id.value)}}>
                    <input name='peer_id' type='text'></input>
                    <button type='submit'>Submit</button>
                </form> */}

                <Draggable bounds='parent' >
                    <div id='remote'>
                        <div id='contactToChat'>
                            <span style={{backgroundColor:'black'}}>
                                <span id='newCap'>N</span>
                            </span>
                            <span>Nick Chen</span>
                        </div>
                        {/* <div id='loadingDots'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div> */}
                        <video id='remoteVideo' src={this.state.counter_stream} autoPlay='true'></video>
                    </div>
                </Draggable>

                {/* {this.state.screenshot==='screenshot'? */}
                            {/* <div id={this.state.screenshot}>
                                <img src={this.state.img} />
                                <span className='close' onClick={this.removePhoto}></span>
                            </div> */}
                            {/* :''} */}
                <div id='controlButtons'>
                    <span onClick={this.audio} value='Mute'><img src='./img/mute.png'/></span>
                    <span onClick={this.capture} value='Screenshot'><img src='./img/screenshoot.png'/></span>
                    <span  value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
    }
}

Talkpage.propTypes = {
    opts: PropTypes.object
}

const mapState =(state)=>({loggedUser:state.currentUser, counterId: state.peer_id})

export default connect(mapState)(Talkpage);