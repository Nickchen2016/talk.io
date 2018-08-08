import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
import PropTypes from 'prop-types';
import socket from'../socket';

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
            counter_videoSrc: {},
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
                    this.setState({counter_videoSrc: URL.createObjectURL(stream)});
                })
            })
        })

        //--------------------------------------------------------------------------------
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
        
        //--------------------------------------------------------------------------------
    }


    componentDidMount(){
        this.props.onRef(this);
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: {
                        volume: 0.9,
                        echoCancellation: true,
                        noiseSuppression: true
                },
                video: true
            })
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
        this.props.onRef(undefined);
		this.state.peer.destroy();
    }

    async capture(){
        const counter_peer_id = await this.props.peer_id;
        if(counter_peer_id) {
            console.log('Here is the counter id I got: ', this.props.peer_id)
            let peer_id= this.props.peer_id;
            this.setState({peer_id});

            var call = this.state.peer.call(peer_id, this.state.stream);
            this.setState({call}, ()=>{
            this.state.call.on('stream', stream=>{
                console.log('*********I got stream from the reciever********', stream)
                this.setState({counter_videoSrc: URL.createObjectURL(stream)});
            })
        })
        }

        //--------------------------------------------------------------------------------
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
        
        //--------------------------------------------------------------------------------

    }

        onStart() {
            this.setState({activeDrags: ++this.state.activeDrags});
          }
        
        onStop() {
            this.setState({activeDrags: --this.state.activeDrags});
          }

    render() {
        // console.log('-----1----', this.props.confirmChat);
        // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return(
            <div id='camera' className={this.props.active}>

                <video id='localVideo' src={this.state.videoSrc} autoPlay='true' muted ></video>

                {/* {this.props.invitation&&this.props.invitation.guest_id===this.props.loggedUser.id?<div id='notification'>{this.props.invitation.inviter} is inviting you for a video chat</div>:''} */}

                {this.props.callForChat!=''&&!this.props.invitation.msg||this.props.confirmChat!=''?<Draggable bounds='parent' >
                    <div id='remote'>
                        <div id='contactToChat'>
                            <span style={{backgroundColor:'black'}}>
                                <span id='newCap'>N</span>
                            </span>
                            <span>Nick Chen</span>
                        </div>
                        {Object.keys(this.state.counter_videoSrc).length===0?
                            <div id='loadingDots'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>:''
                        }
                        <video id='remoteVideo' src={this.state.counter_videoSrc} autoPlay='true'></video>
                    </div>
                </Draggable>:''}

                {/* {this.state.screenshot==='screenshot'? */}
                            {/* <div id={this.state.screenshot}>
                                <img src={this.state.img} />
                                <span className='close' onClick={this.removePhoto}></span>
                            </div> */}
                            {/* :''} */}
                <div id='controlButtons'>
                    <span onClick={this.audio} value='Mute'><img src='./img/mute.png'/></span>
                    {/* <span onClick={this.capture} value='Screenshot'><img src='./img/screenshoot.png'/></span> */}
                    <span  value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
    }
}

Talkpage.propTypes = {
    opts: PropTypes.object
}

const mapState =(state)=>({loggedUser:state.currentUser, invitation: state.invitation, peer_id: state.peer_id})

export default connect(mapState)(Talkpage);