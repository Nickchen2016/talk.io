import React, { Component } from 'react';
import { connect } from 'react-redux';
import Talkpage from './Talkpage';
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
            currentStatus: 'rgb(102,255,153)'
        }
        this.search= this.search.bind(this);
        this.add= this.add.bind(this);
        this.searchNewContact= this.searchNewContact.bind(this);
        this.showStatusBar= this.showStatusBar.bind(this);
        this.onClick= this.onCLick.bind(this);
        this.mouseOver= this.mouseOver.bind(this);
        this.mouseLeave= this.mouseLeave.bind(this);
        this.individualDelete= this.individualDelete.bind(this);
        this.undo= this.undo.bind(this);
    }

// componentDidMount(){
//     axios.put('/api/users', {email: `${this.state.addEmail}`}).then(res=>{console.log('=========',res.data)})
// }

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
        this.setState({active:'active', statusBar:'',search:'',add:''})
    }else{
        this.setState({active:'', statusBar:'',search:'',add:''})
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
    this.state.search===''?this.setState({search:'searchBar',add:'',statusBar:''}):this.setState({search:'',add:'',statusBar:''})
}

add(){
    this.state.add===''?this.setState({add:'addBar',search:'',statusBar:''}):this.setState({add:'',search:'',statusBar:''})
}

searchNewContact(el){
    el.preventDefault();

    axios.put('api/users', {email: el.target.email.value}).then(res=> this.setState({newContact: res.data})).catch(err=> console.error('======',err),this.setState({newContact: {err: 'Contact not exist'}}))
}



    render() {
        console.log('----------', this.state.newContact);
        return(
            <div id='talk-container'>
            <div id='talk-menu' className={this.state.active}>

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

                {this.state.search==='searchBar'?<div id={this.state.search}>
                                                    <input type='text' name='search' placeholder='Search by name' required onChange={el=>this.setState({searchName:el.target.value.toLowerCase()})} />
                                                </div>:''}

                {this.state.add==='addBar'?<div id={this.state.add}>
                                                <form id='addForm' onSubmit={this.searchNewContact}><input type='email' name='email' placeholder='Add new contact by typing Email address' required />
                                                      <button type='Search'>Search</button>
                                                </form>
                                                
                                                {this.state.newContact.name?
                                                    <div id='newContact'>
                                                    <span style={{backgroundColor:`${this.state.newContact.color}`}}></span>
                                                    <span>{this.state.newContact.name[0].toUpperCase()}</span>
                                                    <span>{this.state.newContact.name}</span>
                                                    <span>{this.state.newContact.email}</span>
                                                    <span><img src='./img/plus.png' width='18px'/></span>
                                                </div>:''}
                                                {this.state.newContact.err?<div id='newContact'><p>{this.state.newContact.err}</p></div>:''}

                                           </div>:''}
            
                <div id='sidebar' className={ this.state.active }>
                
                   <div id='search' onClick={this.search}><img src='./img/mag.png' className='sign' style={{marginTop:'18px'}}/></div> 
                   
                   <div id='add' onClick={this.add}><img src='./img/plus.png' className='sign'/></div> 
                   
                   <div id='me'>
                        <span id='profile' style={{backgroundColor:'rgb(255,204,51)'}}></span>
                        <span id='capital' key={this.props.loggedUser.id}>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span>
                        <span id='username'>{ this.props.loggedUser.name }</span>
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
                                                    <span onClick={this.undo}><img src='./img/no.png' width='28px'/></span>
                                                    <span><img src='./img/yes.png' width='28px'/></span>
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

            <Talkpage active={this.state.active}/>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser})

export default connect(mapState)(Sidebar);