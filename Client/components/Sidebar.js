import React, { Component } from 'react';
import { connect } from 'react-redux';
import Talkpage from './Talkpage';
import { logout } from '../redux/currentUser'; 
import axios from 'axios';


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
            loggedInfo: 'loggedInfo',
            currentStatus: 'rgb(102,255,153)'
        }
        this.loggedInfo= this.loggedInfo.bind(this);
        this.search= this.search.bind(this);
        this.add= this.add.bind(this);
        this.searchNewContact= this.searchNewContact.bind(this);
        this.showStatusBar= this.showStatusBar.bind(this);
        this.onClick= this.onCLick.bind(this);
        this.mouseOver= this.mouseOver.bind(this);
        this.mouseLeave= this.mouseLeave.bind(this);
        this.individualDelete= this.individualDelete.bind(this);
        this.undo= this.undo.bind(this);
        // this.addNewContact= this.addNewContact.bind(this);
    }

loggedInfo() {
    this.setState({loggedInfo:'loggedInfo',search:'',add:'', statusBar:''})
}    

showStatusBar(){
    if(this.state.statusBar===''){
        this.setState({statusBar:'statusBar'})
    }else{
        this.setState({statusBar:''})
    }
}

individualDelete() {
        this.setState({delete: 'delete'})
}

onCLick(){
    if(this.state.active===''){
        this.setState({active:'active', statusBar:'',search:'',add:'', loggedInfo:'loggedInfo'})
    }else{
        this.setState({active:'', statusBar:'',search:'',add:'', loggedInfo:'loggedInfo'})
    }
}

mouseOver(){
    if(this.state.words===''&& this.state.isActive===''){this.setState({words:'Toggle menu on click', isActive:'isActive'})}
}

mouseLeave(){
    if(this.state.words==='Toggle menu on click'&& this.state.isActive==='isActive'){this.setState({words:'', isActive:''})}
}

undo(){
    this.setState({delete:''})
}

search(){
    this.setState({search:'searchBar',add:'',statusBar:'',loggedInfo:''})
}

add(){
    this.setState({add:'addBar',search:'',statusBar:'',loggedInfo:''})
}

searchNewContact(el){
    el.preventDefault();

    axios.put('api/users', {email: el.target.email.value}).then(res=> this.setState({newContact: res.data})).catch(err=> console.error('======',err),this.setState({newContact: {err: 'Contact not exist'}}))
}

// addNewContact(){

// }



    render() {
        // console.log('----------', this.props);
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
                                                                                    <span className='choiceOfStatus' onClick={()=>this.setState({currentStatus:'rgb(102,255,153)'})}><span className='status2' style={{backgroundColor:'rgb(102,255,153)'}}></span><p>Online</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>this.setState({currentStatus:'rgb(239,65,54)'})}><span className='status2' style={{backgroundColor:'rgb(239,65,54)'}}></span><p>Busy</p></span>
                                                                                    <span className='choiceOfStatus' onClick={()=>this.setState({currentStatus:'rgb(188,190,192)'})}><span className='status2' style={{backgroundColor:'rgb(188,190,192)'}}></span><p>Leave</p></span>
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
                        <span className='status' onClick={this.showStatusBar} style={{backgroundColor:`${this.state.currentStatus}`}}></span>
                   </div> 

                   <div id='contactList'>
                    
                    { this.props.loggedUser.contacts&&this.props.loggedUser.contacts.sort((a,b)=>{
                                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                            }).filter(el=>el.name.toLowerCase().includes(this.state.searchName))
                            .map(c=>{
                                return (
                                    <div className='individualContact' key={c.id}>
                                        {this.state.id===c.id&&this.state.delete==='delete'?
                                            <div className={this.state.delete}>
                                                <span className='confirmText'>Are you sure to<br/>delete?</span>
                                                <div className='confirmButton'>
                                                    <span className='undoRemove' onClick={this.undo}></span>
                                                    <span className='confirmRemove'></span>
                                                </div>
                                            </div>:''}
                                        <span className='close' onClick={()=>{this.setState({id: c.id});this.individualDelete()}}></span>
                                        <span className='individualProfile' style={{backgroundColor:`${c.color}`}}></span>
                                        <span className='individualCapital'>{ c.name[0].toUpperCase() }</span>
                                        <span className='individualStatus' style={{backgroundColor:'rgb(102,255,153)'}}></span>
                                        <span className='individualName'>{ c.name }</span>
                                    </div>
                                )
                            })
                    }
                    
                   </div>

                </div>

            </div>

            {this.state.active==='active'?<div id={this.state.active}>

                {this.state.loggedInfo==='loggedInfo'?<div id={this.state.loggedInfo}>
                    <div id='loggedDetail'>
                        <div id='profileDetail' style={{backgroundColor:`${this.props.loggedUser&&this.props.loggedUser.color}`}}><span>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span></div>
                        <div id='infoDetail'>
                            <span value={this.props.loggedUser.name}>Name</span>
                            <span value={this.props.loggedUser.email}>Email</span>
                        </div>
                    </div>
                    <button id='signoutButton' onClick={this.props.logout}>Log out</button>
                </div>:''}

                {this.state.search==='searchBar'?<div id={this.state.search}>
                                                    <input type='text' name='search' placeholder='Search by name' required onChange={el=>this.setState({searchName:el.target.value.toLowerCase()})} />
                                                 </div>:''}
                {this.state.add==='addBar'?<div id={this.state.add}>
                                                <form id='addForm' onSubmit={this.searchNewContact}>
                                                    <span><img src='img/add.png' width='28px'/></span>  
                                                    <input type='email' name='email' placeholder='Add new contact by typing Email address' required />
                                                    <button type='Search'>Search</button>
                                                </form>
                                                
                                                {this.state.newContact.name?
                                                    <div id='newContact'>
                                                        <span style={{backgroundColor:`${this.state.newContact.color}`}}>
                                                            <span id='newCap'>{this.state.newContact.name[0].toUpperCase()}</span>
                                                        </span>
                                                        <span>{this.state.newContact.name}</span>
                                                        <span>{this.state.newContact.email}</span>
                                                        <span ><img src='./img/plus.png' width='18px'/></span>
                                                    </div>:''}
                                                {this.state.newContact.err?<div id='newContact'><p>{this.state.newContact.err}</p></div>:''}

                                           </div>:''}
            </div>:''}

            <Talkpage active={this.state.active}/>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser})

const mapDispatch = (dispatch, ownProps)=>({
    logout: () => {dispatch(logout());
    ownProps.history.push('/')
    } 
});

export default connect(mapState, mapDispatch)(Sidebar);