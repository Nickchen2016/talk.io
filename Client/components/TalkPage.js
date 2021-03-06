import React, { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import Peer from 'peerjs';
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
            my_videoSrc: null
        })
        const [endCall, setendCall] = useState(false);
        const [is_counter_loaded, setis_counter_loaded] = useState(false);
        const [callObj,setcallObj] = useState(null);
        const counterVideo = useRef(null);

        useEffect(()=>{ //Get local stream
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
    
        const handleVideo = (stream) => { //Save local stream to state
            setlocalstate({...localstate ,my_videoSrc: stream});
            let video = document.querySelector('#localVideo');
            video.srcObject = stream;
        }
    
        const videoError = (err) => {
            console.log('Got error here '+ err)
        }
    

        
    useEffect(()=>{ // Create peer id if local stream has been saved
        if(localstate.my_videoSrc!=null){
            localstate.peer.on('open', (id) => {
                console.log('My peer ID is: ' + id)
                setlocalstate({
                    ...localstate,
                    my_id: localstate.peer._id,
                    initialized: true
                });
                socket.emit('peer_id', localstate.peer._id)
            })

            localstate.peer.on('call', call=>{ // answer the call here
                call.answer(localstate.my_videoSrc);
                setcallObj(call);
            })
        }
        
    },[localstate.my_videoSrc])

    useEffect(()=>{ // Dynamically assign remote stream to html
        if(callObj!=null){
                callObj.on('stream', remoteStream=>{
                    setis_counter_loaded(true);
                    console.log('stream on!',remoteStream);
                    counterVideo.current.srcObject = remoteStream;
                })
        }
    },[callObj])

    useEffect(()=>{ // function has been called from parent 
        if(props.endCall){
            setendCall(props.endCall);
        }
        if(props.peer_id&&props.connectCall) { // make a call to your friend
            setlocalstate({...localstate ,peer_id: props.peer_id});
            const call = localstate.peer.call(props.peer_id, localstate.my_videoSrc);
            setcallObj(call);
        }
    },[props.endCall,props.connectCall])



    const endVideoCall = () => {
        callObj.close();
        setis_counter_loaded(false);
        props.changeendCall();
        setendCall(false);
        props.deleteId();
        props.deleteInviter();
        changeStatus('rgb(102,255,153)');
    }

    const muted = () => {
        localstate.my_videoSrc.getAudioTracks()[0].enabled = !(localstate.my_videoSrc.getAudioTracks()[0].enabled);
    }
    const capture = () => {
        localstate.my_videoSrc.getVideoTracks()[0].enabled = !(localstate.my_videoSrc.getVideoTracks()[0].enabled);
    }

    const changeStatus = (status) => {
        props.updateContactStatus({ownId: props.loggedUser.id, status});
        props.changeUserInfo({id:props.loggedUser.id, status});
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

                        {!is_counter_loaded?
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
                    <span onClick={capture} value='Screen'><img src='./img/shutscreen.png'/></span>
                    <span onClick={endVideoCall} value='End'><img src='./img/stop.png'/></span>
                </div>
            </div>
        )
}


const mapState =(state)=>({loggedUser:state.currentUser, invitation: state.invitation, peer_id: state.peer_id, inviterInfo:state.inviterInfo, changeUserStatus:state.user.changeUserStatus});
const mapDispatch = (dispatch)=>({
        deleteInviter: ()=> {dispatch(deleteInviter())},
        deleteId: ()=> {dispatch(deleteId())},
        changeUserInfo: (credentials) => {dispatch(changeUserInfo(credentials))},
        updateContactStatus: (credentials) => {dispatch(updateContactStatus(credentials))}
})

export default connect(mapState, mapDispatch)(Talkpage);