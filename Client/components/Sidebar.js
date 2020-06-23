import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Talkpage from './Talkpage';
import { changeUserInfo, getUserInfo } from '../redux/user';
import { logout } from '../redux/currentUser';
import { addNewContact, removeExistContact,updateContactStatus } from '../redux/contact';
import { rejectInvitationKey } from '../redux/invitation';
import axios from 'axios';
// import PropTypes from 'prop-types';
import socket from '../socket';


const Sidebar = (props) =>{
        const [ localstate,setlocalstate ] = useState({
            search:'',
            add:'',
            active: '',
            isActive: '',
            words: '',
            delete:'',
            id:'',
            statusBar:'',
            searchName:'',
            newContact:{},
            chatSign:'',
            guestCallForChat:'',
            loggedInfo: 'loggedInfo',
            endCall: false,
            connectCall: false
        })

const changeStatus = (status)=>{
    props.updateContactStatus({ownId: props.loggedUser.id, status});
    props.changeUserInfo({id: props.loggedUser.id, status});
}

const loggedInfo = () => {
    setlocalstate({...localstate ,loggedInfo:'loggedInfo',search:'',add:'', statusBar:'',searchName:''})
}    

const showStatusBar = () => {
    if(localstate.statusBar===''){
        setlocalstate({...localstate ,statusBar:'statusBar'})
    }else{
        setlocalstate({...localstate ,statusBar:''})
    }
}

const handleOnCLick = () => {
    if(localstate.active===''){
        setlocalstate({...localstate ,active:'active', statusBar:'',search:'',add:'',searchName:'',loggedInfo:'loggedInfo',newContact: {}})
    }else{
        setlocalstate({...localstate ,active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}})
    }
}

const mouseOver = () => {
    if(localstate.words===''&& localstate.isActive===''){setlocalstate({...localstate ,words:'Toggle menu on click', isActive:'isActive'})}
}

const mouseLeave = () => {
    if(localstate.words==='Toggle menu on click'&& localstate.isActive==='isActive'){setlocalstate({...localstate ,words:'', isActive:''})}
}

const undo = () => {
    setlocalstate({...localstate ,delete:'', id:''})
}

const search = () => {
    setlocalstate({...localstate ,search:'searchBar',add:'',statusBar:'',loggedInfo:''})
}

const add = () => {
    setlocalstate({...localstate ,add:'addBar',search:'',statusBar:'',loggedInfo:'',searchName:''})
}

const searchNewContact = (el) => {
    el.preventDefault();

    axios.put('api/users', {email: el.target.email.value})
         .then(res=> { res.data?
            props.loggedUser.contacts&&props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0]&&props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0].hasOwnProperty('userId')?
                setlocalstate({...localstate ,newContact: props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0]})
                :setlocalstate({...localstate ,newContact: res.data})
            :setlocalstate({...localstate ,newContact: 'Contact not exist'})
        })
         .catch(err=> console.error('=======',err))
}

const chat = (value) => {
    setlocalstate({...localstate ,endCall:true, guestCallForChat:{guest_name: value.guest_name, guest_color: value.guest_color} ,active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}});
    socket.emit('trans_info', value);
}


        return(
            <div id='talk-container'>

            <div id='talk-menu'>

                <div id='pointer' className={ localstate.active } onClick={handleOnCLick} onMouseOver={ mouseOver } onMouseLeave={ mouseLeave }>
                     <div id='round'></div>
                     <span id='words' className={ localstate.isActive }>{ localstate.words }</span>
                </div>

                {props.loggedUser.id&&localstate.statusBar==='statusBar'?<div id={localstate.statusBar}>
                                                                                <span id='triangle'></span>
                                                                                <span id='bar'>
                                                                                    <span className='choiceOfStatus' onClick={()=>changeStatus('rgb(102,255,153)')}><span className='status2' style={{backgroundColor:'rgb(102,255,153)'}}></span><p>Online</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>changeStatus('rgb(239,65,54)')}><span className='status2' style={{backgroundColor:'rgb(239,65,54)'}}></span><p>Busy</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>changeStatus('rgb(188,190,192)')}><span className='status2' style={{backgroundColor:'rgb(188,190,192)'}}></span><p>Leave</p></span>
                                                                                </span>
                                                                              </div>:''}
            
                <div id='sidebar' className={ localstate.active }>
                
                   <div id='search' onClick={search}><img src='./img/mag.png' className='sign' style={{marginTop:'18px'}}/></div> 
                   
                   <div id='add' onClick={add}><img src='./img/plus.png' className='sign'/></div> 
                   
                   <div id='me'>
                    <span id='loggedUserTab' onClick={loggedInfo}>
                        <span id='profile' style={{backgroundColor:`${props.loggedUser.color}`}}>
                            <span id='capital' key={props.loggedUser.id}>{props.loggedUser.name&&props.loggedUser.name[0].toUpperCase()}</span>
                        </span>
                        <span id='username'>{ props.loggedUser.name&&props.loggedUser.name }</span>
                    </span>    
                        <span className='status' onClick={showStatusBar} style={{backgroundColor: props.loggedUser.status}}></span>
                   </div> 

                   <div id='contactList'>
                    
                    { props.loggedUser.contacts&&props.loggedUser.contacts.sort((a,b)=>{
                                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                            }).filter(el=>el.name.toLowerCase().includes(localstate.searchName))
                            .map(c=>{
                                return (
                                    <div className='individualContactInfo' key={c.id} onMouseOver={()=>{c.status==='rgb(102,255,153)'?setlocalstate({...localstate ,id: c.id, chatSign: 'chatSign'}):setlocalstate({...localstate,id: c.id, chatSign: ''})}} onMouseLeave={()=> setlocalstate({...localstate, id: '', chatSign: '', delete:''})}>
                                        <div className='individualContact'>

                                            {localstate.id===c.id&&localstate.delete==='delete'?
                                            <div className={localstate.delete}>
                                                <span className='confirmText'>Are you sure to<br/>delete?</span>
                                                <div className='confirmButton'>
                                                    <span className='undoRemove' onClick={undo}></span>
                                                    <span className='confirmRemove' onClick={()=>{props.removeExistContact(c.id); setlocalstate({...localstate ,id: '', delete: ''})}}></span>
                                                </div>
                                            </div>:''}

                                            <span className='close' onClick={()=>{setlocalstate({...localstate ,delete: 'delete'})}}></span>
                                            <span className='individualProfile' style={{backgroundColor:`${c.color}`}}>
                                                <span className='individualCapital'>{ c.name[0].toUpperCase() }</span>
                                            </span>
                                            <span className='individualStatus' style={{backgroundColor: c.status}}></span>
                                            <span className='individualName'>{ c.name }</span>
                                        </div>

                                        { localstate.id===c.id&&localstate.chatSign==='chatSign'&&localstate.delete!=='delete'?<div className={localstate.chatSign} 
                                        onClick={()=>{changeStatus('rgb(239,65,54)');
                                        chat({guest_id:c.ownId, guest_name:c.name, guest_color:c.color, room:props.loggedUser.id+c.ownId, inviter:props.loggedUser.name, inviter_color:props.loggedUser.color})}}>
                                                <span><img src='./img/chat.png' width='35px' /></span>
                                                <span>Start<br/>Chat</span>
                                        </div>:'' }
                                        
                                    </div>
                                )
                            })
                    }
                    
                   </div>

                </div>

            </div>

            {props.invitation&&props.invitation.guest_id===props.loggedUser.id?<div id='notification'>
                        <p className='notice'>{props.invitation.inviter} is inviting you for a video chat</p>
                        <span className='undoRemove' onClick={()=>{props.rejectInvitationKey(); changeStatus('rgb(102,255,153)'); socket.emit('reject',{inviter:props.invitation.inviter, room:props.invitation.room, msg:props.loggedUser.name +' is not available at the moment'})}}></span>
                        <span className='confirmRemove' 
                            onClick={()=>{props.rejectInvitationKey(); 
                                socket.emit('confirm', {room:props.invitation.room}); 
                                setlocalstate({...localstate ,active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}, endCall: true, connectCall:true}); 
                                changeStatus('rgb(239,65,54)'); 
                        }}></span>          
                </div>:props.invitation&&props.invitation.inviter===props.loggedUser.name&&props.invitation.msg?
                <div id='notification'>
                    <p className='notice'>{props.invitation.msg}</p>
                    <span className='undoRemove' onClick={()=>{props.rejectInvitationKey(); 
                        changeStatus('rgb(102,255,153)'); 
                        setlocalstate({...localstate ,guestCallForChat:'',endCall:false})}}>
                    </span>
                </div>:''}
            {localstate.active==='active'?<div id={localstate.active}>

                {localstate.loggedInfo==='loggedInfo'?<div id={localstate.loggedInfo}>
                    <div id='loggedDetail'>
                        <div id='profileDetail' style={{backgroundColor:`${props.loggedUser&&props.loggedUser.color}`}}><span>{props.loggedUser.name&&props.loggedUser.name[0].toUpperCase()}</span></div>
                        <div id='infoDetail'>
                            <span value={props.loggedUser.name}>Name</span>
                            <span value={props.loggedUser.email}>Email</span>
                        </div>
                    </div>
                    <button id='signoutButton' onClick={()=>{changeStatus('rgb(188,190,192)'); props.logout(props.loggedUser.id)}}>Log out</button>
                </div>:''}

                {localstate.search==='searchBar'?<div id={localstate.search}>
                                                    <input type='text' name='search' placeholder='Search contacts by name' required onChange={el=>setlocalstate({...localstate ,searchName:el.target.value.toLowerCase()})} />
                                                 </div>:''}
                {localstate.add==='addBar'?<div id={localstate.add}>
                                                <form id='addForm' onSubmit={searchNewContact}>
                                                    <span><img src='img/add.png' width='28px'/></span>  
                                                    <input type='email' name='email' placeholder='Add new contact by typing Email address' required />
                                                    <button type='Search'>Search</button>
                                                </form>


                {localstate.newContact!=='Contact not exist'&&!Object.keys(localstate.newContact).length?
                    ''
                    :localstate.newContact==='Contact not exist'?
                        <div id='newContact'><p>{localstate.newContact}</p></div>
                    :localstate.newContact.hasOwnProperty('userId')?
                        <div id='newContact'>
                            <span style={{backgroundColor:`${localstate.newContact.color}`}}>
                                <span id='newCap'>{localstate.newContact.name[0].toUpperCase()}</span>
                            </span>
                            <span>{localstate.newContact.name}</span>
                            <span>is in your contacts</span>
                        </div>
                    :localstate.newContact.id===props.loggedUser.id?
                        <div id='newContact'>
                            <span style={{backgroundColor:`${localstate.newContact.color}`}}>
                                <span id='newCap'>{localstate.newContact.name[0].toUpperCase()}</span>
                            </span>
                            <span>{localstate.newContact.name}</span>
                            <span>You are the owner of this acount</span>
                        </div>
                    :<div id='newContact'>
                        <span style={{backgroundColor:`${localstate.newContact.color}`}}>
                            <span id='newCap'>{localstate.newContact.name&&localstate.newContact.name[0].toUpperCase()}</span>
                        </span>
                        <span>{localstate.newContact.name}</span>
                        <span>{localstate.newContact.email}</span>
                        <span onClick={()=> {props.addNewContact(
                                {ownId: localstate.newContact.id,
                                 color: localstate.newContact.color,
                                 name: localstate.newContact.name,
                                 email: localstate.newContact.email,
                                 userId: props.loggedUser.id,
                                 status: localstate.newContact.status
                                }); 
                                setlocalstate({...localstate ,newContact: {}})
                                }}>
                            <img src='./img/plus.png' width='18px'/>
                        </span>
                    </div>
                    }

                    </div>:''}
            </div>:''}

            <Talkpage 
            endCall={localstate.endCall}
            connectCall={localstate.connectCall}
            active={localstate.active} guestCallForChat={localstate.guestCallForChat} />
            </div>
        )
    }

// Talkpage.propTypes = {
//     opts: PropTypes.object,
//     history: PropTypes.object
// }

const mapState =(state)=>({loggedUser:state.currentUser, getUserStatus: state.user.getUserStatus, contactStatus: state.status, invitation: state.invitation});

const mapDispatch = (dispatch, ownProps)=>({
    logout: (credential) => {dispatch(logout(credential));
    ownProps.history.push('/')
    },
    changeUserInfo: (credentials) => {dispatch(changeUserInfo(credentials))},
    addNewContact: (credentials) => {dispatch(addNewContact(credentials))},
    // getUserInfo: (credential) => {dispatch(getUserInfo(credential))},
    removeExistContact: (credential) => {dispatch(removeExistContact(credential))},
    updateContactStatus: (credentials) => {dispatch(updateContactStatus(credentials))},
    rejectInvitationKey: (credential) => {dispatch(rejectInvitationKey(credential))}
});

export default connect(mapState, mapDispatch)(Sidebar);