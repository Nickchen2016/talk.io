import React, { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
// import PropTypes from 'prop-types';
import socket from'../socket';
import { changeUserInfo } from '../redux/user';
import { updateContactStatus } from '../redux/contact';
import { deleteId } from '../redux/peer_id';
import { deleteInviter } from '../redux/inviterInfo';

const Talkpage = (props) => {

        const [localstate,setlocalstate] = useState({
            peer: new Peer(),
            my_id: '',
            peer_id: '',
            initialized: false,
            files: [],
            audio: true,
            img:'',
            activeDrags: 0,
            video: '',
            has_counter_videoSrc: false
        })
        const [endCall, setendCall] = useState(false);
        const [callObj,setcallObj] = useState(null)
        const counterVideo = useRef(null);

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
            return ()=>{
                localstate.peer.destroy();
            }
        },[])
    
        const handleVideo = (stream) => {
            setlocalstate({...localstate ,my_videoSrc: stream});
            let video = document.querySelector('#localVideo');
            video.srcObject = stream;
        }
    
        const videoError = (err) => {
            console.log('Got error here '+ err)
        }
    

        
    useEffect(()=>{
        if(localstate.my_videoSrc!=undefined){
            localstate.peer.on('open', (id) => {
                console.log('My peer ID is: ' + id)
                setlocalstate({
                    ...localstate,
                    my_id: localstate.peer._id,
                    initialized: true
                });
                socket.emit('peer_id', localstate.peer._id)
            })

            localstate.peer.on('call', call=>{
                console.log('what the heck r u!',localstate.my_videoSrc)
                const video = counterVideo.current;
                call.answer(localstate.my_videoSrc);
                setcallObj(call);
            })
        }
        
    },[localstate.my_videoSrc])

    useEffect(()=>{
        if(callObj!=null){
                callObj.on('stream', remoteStream=>{
                    console.log('stream on!',remoteStream);
                    counterVideo.current.srcObject = remoteStream;
                })
        }
    },[callObj])

    useEffect(()=>{
        if(props.endCall){
            // console.log('I got the endCall',props.endCall)
            setendCall(props.endCall);
        }
        if(props.peer_id&&props.connectCall) {
            // console.log('I got the connectCall',props.connectCall)
            //     console.log('Here is the counter id I got: ', props.peer_id, localstate.my_videoSrc)
            
            setlocalstate({...localstate ,peer_id: props.peer_id});
            const call = localstate.peer.call(props.peer_id, localstate.my_videoSrc);
            setcallObj(call);
        }
    },[props.endCall,props.connectCall])





    const endVideoCall = () => {
            callObj.close();
            changeStatus('rgb(102,255,153)');
            setendCall(false);
            props.deleteId();
            props.deleteInviter();
    }

    const muted = () => {
        localstate.my_id.getAudioTracks().forEach(track => track.enabled = !track.enabled);
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

                <video id='localVideo' autoPlay={true} muted ></video>
                {endCall?<Draggable bounds='parent' >
                    <div id='remote'>
                        {props.guestCallForChat!=''&&props.invitation===''||props.inviterInfo!=''?<div id='contactToChat'>
                                <span style={{backgroundColor:`${props.guestCallForChat.guest_color||props.inviterInfo.inviter_color}`}}>
                                    <span id='newCap'>{props.guestCallForChat&&props.guestCallForChat.guest_name[0].toUpperCase()||props.inviterInfo&&props.inviterInfo.inviter[0].toUpperCase()}</span>
                                </span>
                                <span>{props.guestCallForChat.guest_name||props.inviterInfo.inviter}</span>
                        </div>:''}

                        {!localstate.has_counter_videoSrc?
                            <div id='loadingDots'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>:''
                        }
                        <video id='remoteVideo' ref={counterVideo} autoPlay={true}></video>
                    </div>
                </Draggable>:''}

                <div id='controlButtons'>
                    <span onClick={muted} value='Mute'><img src='./img/mute.png'/></span>
                    {/* <span onClick={this.capture} value='Screenshot'><img src='./img/screenshoot.png'/></span> */}
                    <span onClick={endVideoCall} value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
}

// Talkpage.propTypes = {
//     opts: PropTypes.object
// }

const mapState =(state)=>({loggedUser:state.currentUser, invitation: state.invitation, peer_id: state.peer_id, inviterInfo:state.inviterInfo, changeUserStatus:state.user.changeUserStatus});
const mapDispatch = (dispatch)=>({
        deleteInviter: ()=> {dispatch(deleteInviter())},
        deleteId: ()=> {dispatch(deleteId())},
        changeUserInfo: (credentials) => {dispatch(changeUserInfo(credentials))},
        updateContactStatus: (credentials) => {dispatch(updateContactStatus(credentials))}
})

export default connect(mapState, mapDispatch)(Talkpage);