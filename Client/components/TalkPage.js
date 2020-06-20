import React, { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
import PropTypes from 'prop-types';
import socket from'../socket';
import { changeUserInfo } from '../redux/user';
import { updateContactStatus } from '../redux/contact';
import { deleteId } from '../redux/peer_id';
import { deleteInviter } from '../redux/inviterInfo';

const Talkpage = forwardRef((props,ref) => {

        const [localstate,setlocalstate] = useState({
            peer: new Peer(),
            my_id: '',
            peer_id: '',
            initialized: false,
            files: [],
            audio: true,
            img:'',
            activeDrags: 0,
            // videoSrc:{},
            stream:{},
            // counter_videoSrc: {},
            video: '',
            endCall: false
        })

    // componentWillMount(){
    //     this.state.peer.on('open', (id) => {
	// 		console.log('My peer ID is: ' + id);
	// 		this.setState({
	// 			my_id: id,
	// 			initialized: true
	// 		});
    //     });
        
    //     this.state.peer.on('call', call=>{
    //         console.log('******Been called here*******', call);
    //         call.answer(this.state.stream)
    //         this.setState({call}, ()=>{
    //             this.state.call.on('stream', stream=>{
    //                 console.log('********I got stream from receiver********', stream)
    //                 // this.setState({counter_videoSrc: stream});
    //                 let video = document.querySelector('#remoteVideo');
    //                 video.srcObject = stream;
    //             })
    //         })
    //     })
    // }


    useEffect(()=>{
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia;
        if(navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: {
                    volume: localstate.toggleAudio,
                    echoCancellation: true,
                    noiseSuppression: true
                },
                video: true
            })
            .then(handleVideo)
            .catch(videoError)
        }
    },[])

    const handleVideo = (stream) => {
        setlocalstate({...localstate ,stream});
        let video = document.querySelector('#localVideo');
        video.srcObject = stream;
        // let videoSrc = stream;
        // this.setState({ videoSrc });
        socket.emit('peer_id', localstate.my_id)
    }

    const videoError = (err) => {
        console.log('Got error here '+ err)
    }

    // componentWillUnmount(){
    //     this.props.onRef(undefined);
	// 	this.state.peer.destroy();
    // }

    useImperativeHandle(ref,() => ({
        initializeEndCall(val) {
            setlocalstate({ ...localstate ,endCall:val });
        },
        connectCall() {
            if(props.peer_id) {
                console.log('Here is the counter id I got: ', props.peer_id)
                let peer_id= props.peer_id;
                setlocalstate({...localstate ,peer_id});
    
                var call = localstate.peer.call(peer_id, localstate.stream);
                setlocalstate({...localstate ,call}, ()=>{
                localstate.call.on('stream', stream=>{
                    console.log('*********I got stream from the inviter********', stream)
                    setlocalstate({...localstate ,counter_videoSrc: stream});
                })
            })
            }
        }

    }))

    const endCall = () => {
            localstate.call.close();
            changeStatus('rgb(102,255,153)');
            setlocalstate({ ...localstate ,counter_videoSrc:{}, endCall: false });
            props.deleteId();
            props.deleteInviter();
    }

    const muted = () => {
        localstate.stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    }

    const changeStatus = (status) => {
        props.updateContactStatus({ownId: props.loggedUser.id, status});
        props.changeUserInfo({id:props.loggedUser.id, status});
    }

    const onStart = () => {
            setlocalstate({...localstate ,activeDrags: ++localstate.activeDrags});
          }
        
    const onStop = () => {
            setlocalstate({...localstate ,activeDrags: --localstate.activeDrags});
          }


        return(
            <div id='camera' className={props.active}>

                <video id='localVideo' src={localstate.videoSrc} autoPlay={true} muted ></video>

                {!props.invitation.msg&&localstate.endCall?<Draggable bounds='parent' >
                    <div id='remote'>
                        {props.guestCallForChat!=''&&props.invitation===''||props.inviterInfo!=''?<div id='contactToChat'>
                                                                <span style={{backgroundColor:`${props.guestCallForChat.guest_color||props.inviterInfo.inviter_color}`}}>
                                                                    <span id='newCap'>{props.guestCallForChat&&props.guestCallForChat.guest_name[0].toUpperCase()||props.inviterInfo&&props.inviterInfo.inviter[0].toUpperCase()}</span>
                                                                </span>
                                                                <span>{props.guestCallForChat.guest_name||props.inviterInfo.inviter}</span>
                                                         </div>:''}

                                                        {Object.keys(localstate.counter_videoSrc).length===0?
                                                            <div id='loadingDots'>
                                                                <span></span>
                                                                <span></span>
                                                                <span></span>
                                                            </div>:''
                                                        }
                        <video id='remoteVideo' autoPlay={true}></video>
                    </div>
                </Draggable>:''}

                <div id='controlButtons'>
                    <span onClick={muted} value='Mute'><img src='./img/mute.png'/></span>
                    {/* <span onClick={this.capture} value='Screenshot'><img src='./img/screenshoot.png'/></span> */}
                    <span onClick={endCall} value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
})

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