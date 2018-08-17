import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
import PropTypes from 'prop-types';
import socket from'../socket';
import { changeUserInfo } from '../redux/user';
import { updateContactStatus } from '../redux/contact';
import { deleteId } from '../redux/peer_id';
import { deleteInviter } from '../redux/inviterInfo';

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
            img:'',
            activeDrags: 0,
            videoSrc:{},
            stream:{},
            counter_videoSrc: {},
            video: '',
            endCall: false
        }
        this.handleVideo= this.handleVideo.bind(this);
        this.videoError= this.videoError.bind(this);
        this.connectCall= this.connectCall.bind(this);
        this.initializeEndCall= this.initializeEndCall.bind(this);
        this.muted= this.muted.bind(this);
        this.endCall= this.endCall.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.changeStatus= this.changeStatus.bind(this);
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
                    console.log('********I got stream from receiver********', stream)
                    this.setState({counter_videoSrc: URL.createObjectURL(stream)});
                })
            })
        })
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
        console.log('Got error here '+ err)
    }

    componentWillUnmount(){
        this.props.onRef(undefined);
		this.state.peer.destroy();
    }

    initializeEndCall(val){
        this.setState({ endCall:val });
    }

    connectCall(){
        if(this.props.peer_id) {
            console.log('Here is the counter id I got: ', this.props.peer_id)
            let peer_id= this.props.peer_id;
            this.setState({peer_id});

            var call = this.state.peer.call(peer_id, this.state.stream);
            this.setState({call}, ()=>{
            this.state.call.on('stream', stream=>{
                console.log('*********I got stream from the inviter********', stream)
                this.setState({counter_videoSrc: URL.createObjectURL(stream)});
            })
        })
        }
    }

    endCall(){
            this.state.call.close();
            this.changeStatus('rgb(102,255,153)');
            this.setState({ counter_videoSrc:{}, endCall: false });
            this.props.deleteId();
            this.props.deleteInviter();
    }

    muted(){
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio:false,
                video: true
            })
            .then(this.handleVideo)
            .catch(this.videoError)
        }
    }

    changeStatus(status){
        this.props.updateContactStatus({ownId: this.props.loggedUser.id, status});
        this.props.changeUserInfo({id:this.props.loggedUser.id, status});
    }

        onStart() {
            this.setState({activeDrags: ++this.state.activeDrags});
          }
        
        onStop() {
            this.setState({activeDrags: --this.state.activeDrags});
          }

    render() {
        console.log('-----1----', this.state, '-----2----', this.state.my_id);
        // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        return(
            <div id='camera' className={this.props.active}>

                <video id='localVideo' src={this.state.videoSrc} autoPlay='true' muted ></video>

                {!this.props.invitation.msg&&this.state.endCall?<Draggable bounds='parent' >
                    <div id='remote'>
                        {this.props.guestCallForChat!=''&&this.props.invitation===''||this.props.inviterInfo!=''?<div id='contactToChat'>
                                                                <span style={{backgroundColor:`${this.props.guestCallForChat.guest_color||this.props.inviterInfo.inviter_color}`}}>
                                                                    <span id='newCap'>{this.props.guestCallForChat&&this.props.guestCallForChat.guest_name[0].toUpperCase()||this.props.inviterInfo&&this.props.inviterInfo.inviter[0].toUpperCase()}</span>
                                                                </span>
                                                                <span>{this.props.guestCallForChat.guest_name||this.props.inviterInfo.inviter}</span>
                                                         </div>:''}

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

                <div id='controlButtons'>
                    <span onClick={this.muted} value='Mute'><img src='./img/mute.png'/></span>
                    {/* <span onClick={this.capture} value='Screenshot'><img src='./img/screenshoot.png'/></span> */}
                    <span onClick={this.endCall} value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
    }
}

Talkpage.propTypes = {
    opts: PropTypes.object
}

const mapState =(state)=>({loggedUser:state.currentUser, invitation: state.invitation, peer_id: state.peer_id, inviterInfo:state.inviterInfo, changeUserStatus:state.user.changeUserStatus});
const mapDispatch = (dispatch)=>({
    deleteInviter: ()=> {dispatch(deleteInviter())},
    deleteId: ()=> {dispatch(deleteId())},
    changeUserInfo: (credentials) => {dispatch(changeUserInfo(credentials))},
    updateContactStatus: (credentials) => {dispatch(updateContactStatus(credentials))}
})

export default connect(mapState, mapDispatch)(Talkpage);