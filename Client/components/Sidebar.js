import React, { Component } from 'react';
import { connect } from 'react-redux';
import Talkpage from './Talkpage';
import { changeUserInfo, getUserInfo } from '../redux/user';
import { logout } from '../redux/currentUser';
import { addNewContact, removeExistContact,updateContactStatus } from '../redux/contact';
import { rejectInvitationKey } from '../redux/invitation';
import axios from 'axios';
import PropTypes from 'prop-types';
import socket from '../socket';


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
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
            callForChat:'',
            confirmChat: '',
            loggedInfo: 'loggedInfo'
        }
        this.loggedInfo= this.loggedInfo.bind(this);
        this.search= this.search.bind(this);
        this.add= this.add.bind(this);
        this.searchNewContact= this.searchNewContact.bind(this);
        this.showStatusBar= this.showStatusBar.bind(this);
        this.onClick= this.onCLick.bind(this);
        this.mouseOver= this.mouseOver.bind(this);
        this.mouseLeave= this.mouseLeave.bind(this);
        this.undo= this.undo.bind(this);
        this.changeStatus= this.changeStatus.bind(this);
        this.chat=this.chat.bind(this);
    }


changeStatus(status){
    this.props.updateContactStatus({ownId: this.props.loggedUser.id, status});
    this.props.changeUserInfo({id:this.props.loggedUser.id, status});
}

loggedInfo() {
    this.setState({loggedInfo:'loggedInfo',search:'',add:'', statusBar:'',searchName:''})
}    

showStatusBar(){
    if(this.state.statusBar===''){
        this.setState({statusBar:'statusBar'})
    }else{
        this.setState({statusBar:''})
    }
}

onCLick(){
    if(this.state.active===''){
        this.setState({active:'active', statusBar:'',search:'',add:'',searchName:'',loggedInfo:'loggedInfo',newContact: {}})
    }else{
        this.setState({active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}})
    }
}

mouseOver(){
    if(this.state.words===''&& this.state.isActive===''){this.setState({words:'Toggle menu on click', isActive:'isActive'})}
}

mouseLeave(){
    if(this.state.words==='Toggle menu on click'&& this.state.isActive==='isActive'){this.setState({words:'', isActive:''})}
}

undo(){
    this.setState({delete:'', id:''})
}

search(){
    this.setState({search:'searchBar',add:'',statusBar:'',loggedInfo:''})
}

add(){
    this.setState({add:'addBar',search:'',statusBar:'',loggedInfo:'',searchName:''})
}

searchNewContact(el){
    el.preventDefault();

    axios.put('api/users', {email: el.target.email.value})
         .then(res=> { res.data?
            this.props.loggedUser.contacts&&this.props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0]&&this.props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0].hasOwnProperty('userId')?
                this.setState({newContact: this.props.loggedUser.contacts.filter(c=> c.email===res.data.email)[0]})
                :this.setState({newContact: res.data})
            :this.setState({newContact: 'Contact not exist'})
        })
         .catch(err=> console.error('=======',err))
}

chat(value){
    this.setState({callForChat:'callForChat',active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}});
    socket.emit('trans_info', value);
}


    render() {

        // console.log('----66666----', this.props);
        return(
            <div id='talk-container'>

            <div id='talk-menu'>

                <div id='pointer' className={ this.state.active } onClick={ this.onClick } onMouseOver={ this.mouseOver } onMouseLeave={ this.mouseLeave }>
                     <div id='round'></div>
                     <span id='words' className={ this.state.isActive }>{ this.state.words }</span>
                </div>

                {this.props.loggedUser.id&&this.state.statusBar==='statusBar'?<div id={this.state.statusBar}>
                                                                                <span id='triangle'></span>
                                                                                <span id='bar'>
                                                                                    <span className='choiceOfStatus' onClick={()=>this.changeStatus('rgb(102,255,153)')}><span className='status2' style={{backgroundColor:'rgb(102,255,153)'}}></span><p>Online</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>this.changeStatus('rgb(239,65,54)')}><span className='status2' style={{backgroundColor:'rgb(239,65,54)'}}></span><p>Busy</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>this.changeStatus('rgb(188,190,192)')}><span className='status2' style={{backgroundColor:'rgb(188,190,192)'}}></span><p>Leave</p></span>
                                                                                </span>
                                                                              </div>:''}
            
                <div id='sidebar' className={ this.state.active }>
                
                   <div id='search' onClick={this.search}><img src='./img/mag.png' className='sign' style={{marginTop:'18px'}}/></div> 
                   
                   <div id='add' onClick={this.add}><img src='./img/plus.png' className='sign'/></div> 
                   
                   <div id='me'>
                    <span id='loggedUserTab' onClick={this.loggedInfo}>
                        <span id='profile' style={{backgroundColor:`${this.props.loggedUser.color}`}}>
                            <span id='capital' key={this.props.loggedUser.id}>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span>
                        </span>
                        <span id='username'>{ this.props.loggedUser.name&&this.props.loggedUser.name }</span>
                    </span>    
                        <span className='status' onClick={this.showStatusBar} style={{backgroundColor: this.props.loggedUser.status}}></span>
                   </div> 

                   <div id='contactList'>
                    
                    { this.props.loggedUser.contacts&&this.props.loggedUser.contacts.sort((a,b)=>{
                                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                            }).filter(el=>el.name.toLowerCase().includes(this.state.searchName))
                            .map(c=>{
                                return (
                                    <div className='individualContactInfo' key={c.id} onMouseOver={()=>{c.status==='rgb(102,255,153)'?this.setState({id: c.id, chatSign: 'chatSign'}):this.setState({id: c.id, chatSign: ''})}} onMouseLeave={()=> this.setState({id: '', chatSign: '', delete:''})}>
                                        <div className='individualContact'>

                                            {this.state.id===c.id&&this.state.delete==='delete'?
                                            <div className={this.state.delete}>
                                                <span className='confirmText'>Are you sure to<br/>delete?</span>
                                                <div className='confirmButton'>
                                                    <span className='undoRemove' onClick={this.undo}></span>
                                                    <span className='confirmRemove' onClick={()=>{this.props.removeExistContact(c.id); this.setState({id: '', delete: ''})}}></span>
                                                </div>
                                            </div>:''}

                                            <span className='close' onClick={()=>{this.setState({delete: 'delete'})}}></span>
                                            <span className='individualProfile' style={{backgroundColor:`${c.color}`}}>
                                                <span className='individualCapital'>{ c.name[0].toUpperCase() }</span>
                                            </span>
                                            <span className='individualStatus' style={{backgroundColor: c.status}}></span>
                                            <span className='individualName'>{ c.name }</span>
                                        </div>

                                        { this.state.id===c.id&&this.state.chatSign==='chatSign'&&this.state.delete!=='delete'?<div className={this.state.chatSign} onClick={()=>{this.changeStatus('rgb(239,65,54)'); this.chat({guest_id:c.ownId,room:this.props.loggedUser.id+c.ownId,inviter:this.props.loggedUser.name})}}>
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

            {this.props.invitation&&this.props.invitation.guest_id===this.props.loggedUser.id?<div id='notification'>
                        <p className='notice'>{this.props.invitation.inviter} is inviting you for a video chat</p>
                        <span className='undoRemove' onClick={()=>{this.props.rejectInvitationKey(); socket.emit('reject',{inviter:this.props.invitation.inviter, room:this.props.invitation.room, msg:this.props.loggedUser.name +' is not available at the moment'}); this.setState({confirmChat: ''})}}></span>
                        <span className='confirmRemove' onClick={()=>{this.props.rejectInvitationKey(); socket.emit('confirm', {room:this.props.invitation.room}); this.setState({confirmChat: 'confirmChat', active:'', statusBar:'',search:'',add:'',searchName:'', loggedInfo:'loggedInfo',newContact: {}}); this.changeStatus('rgb(239,65,54)'); this.talkpage.capture()}}></span>          
                </div>:this.props.invitation&&this.props.invitation.inviter===this.props.loggedUser.name&&this.props.invitation.msg?
                <div id='notification'>
                    <p className='notice'>{this.props.invitation.msg}</p>
                    <span className='undoRemove' onClick={()=>{this.props.rejectInvitationKey(); this.setState({callForChat:''})}}></span>
                </div>:''}

            {this.state.active==='active'?<div id={this.state.active}>

                {this.state.loggedInfo==='loggedInfo'?<div id={this.state.loggedInfo}>
                    <div id='loggedDetail'>
                        <div id='profileDetail' style={{backgroundColor:`${this.props.loggedUser&&this.props.loggedUser.color}`}}><span>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span></div>
                        <div id='infoDetail'>
                            <span value={this.props.loggedUser.name}>Name</span>
                            <span value={this.props.loggedUser.email}>Email</span>
                        </div>
                    </div>
                    <button id='signoutButton' onClick={()=>{this.changeStatus('rgb(188,190,192)'); this.props.logout(this.props.loggedUser.id)}}>Log out</button>
                </div>:''}

                {this.state.search==='searchBar'?<div id={this.state.search}>
                                                    <input type='text' name='search' placeholder='Search contacts by name' required onChange={el=>this.setState({searchName:el.target.value.toLowerCase()})} />
                                                 </div>:''}
                {this.state.add==='addBar'?<div id={this.state.add}>
                                                <form id='addForm' onSubmit={this.searchNewContact}>
                                                    <span><img src='img/add.png' width='28px'/></span>  
                                                    <input type='email' name='email' placeholder='Add new contact by typing Email address' required />
                                                    <button type='Search'>Search</button>
                                                </form>


                {this.state.newContact!=='Contact not exist'&&!Object.keys(this.state.newContact).length?
                    ''
                    :this.state.newContact==='Contact not exist'?
                        <div id='newContact'><p>{this.state.newContact}</p></div>
                    :this.state.newContact.hasOwnProperty('userId')?
                        <div id='newContact'>
                            <span style={{backgroundColor:`${this.state.newContact.color}`}}>
                                <span id='newCap'>{this.state.newContact.name[0].toUpperCase()}</span>
                            </span>
                            <span>{this.state.newContact.name}</span>
                            <span>is in your contacts</span>
                        </div>
                    :this.state.newContact.id===this.props.loggedUser.id?
                        <div id='newContact'>
                            <span style={{backgroundColor:`${this.state.newContact.color}`}}>
                                <span id='newCap'>{this.state.newContact.name[0].toUpperCase()}</span>
                            </span>
                            <span>{this.state.newContact.name}</span>
                            <span>You are the owner of this acount</span>
                        </div>
                    :<div id='newContact'>
                        <span style={{backgroundColor:`${this.state.newContact.color}`}}>
                            <span id='newCap'>{this.state.newContact.name&&this.state.newContact.name[0].toUpperCase()}</span>
                        </span>
                        <span>{this.state.newContact.name}</span>
                        <span>{this.state.newContact.email}</span>
                        <span onClick={()=> {this.props.addNewContact(
                                {ownId: this.state.newContact.id,
                                 color: this.state.newContact.color, 
                                 name: this.state.newContact.name,
                                 email: this.state.newContact.email,
                                 userId: this.props.loggedUser.id,
                                 status: this.state.newContact.status
                                }); 
                                this.setState({newContact: {}})
                                }}>
                            <img src='./img/plus.png' width='18px'/>
                        </span>
                    </div>
                    }

                    </div>:''}
            </div>:''}

            <Talkpage onRef={ ref => (this.talkpage = ref) } active={this.state.active} callForChat={this.state.callForChat} confirmChat={this.state.confirmChat}/>
            </div>
        )
    }
}

Talkpage.propTypes = {
    opts: PropTypes.object,
    history: PropTypes.object
}

const mapState =(state)=>({loggedUser:state.currentUser, getUserStatus: state.user.getUserStatus, contactStatus: state.status, invitation: state.invitation});

const mapDispatch = (dispatch, ownProps)=>({
    logout: (credential) => {dispatch(logout(credential));
    ownProps.history.push('/')
    },
    changeUserInfo: (credentials) => {dispatch(changeUserInfo(credentials))},
    addNewContact: (credentials) => {dispatch(addNewContact(credentials))},
    getUserInfo: (credential) => {dispatch(getUserInfo(credential))},
    removeExistContact: (credential) => {dispatch(removeExistContact(credential))},
    updateContactStatus: (credentials) => {dispatch(updateContactStatus(credentials))},
    rejectInvitationKey: (credential) => {dispatch(rejectInvitationKey(credential))}
});

export default connect(mapState, mapDispatch)(Sidebar);