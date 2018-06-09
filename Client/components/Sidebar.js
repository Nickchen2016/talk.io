import React, { Component } from 'react';
import { connect } from 'react-redux';
import Talkpage from './Talkpage';


class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: '',
            isActive: '',
            words: '',
            delete:''
        }
        this.onClick= this.onCLick.bind(this);
        this.mouseOver= this.mouseOver.bind(this);
        this.mouseLeave= this.mouseLeave.bind(this);
        this.individualDelte= this.individualDelte.bind(this);
    }

individualDelte() {
        this.setState({delete: 'delete'})
}

onCLick(){
    if(this.state.active===''){
        this.setState({active:'active'})
    }else{
        this.setState({active:''})
    }
}

mouseOver(){
    if(this.state.words===''&& this.state.isActive===''){this.setState({words:'Toggle menu on click', isActive:'isActive'})}
}

mouseLeave(){
    if(this.state.words==='Toggle menu on click'&& this.state.isActive==='isActive'){this.setState({words:'', isActive:''})}
}
 
    render() {
        // console.log('----------', this.state.delete);
        return(
            <div className='talk-container'>

                <div id='pointer' className={ this.state.active } onMouseOver={ this.mouseOver } onMouseLeave={ this.mouseLeave }>
                     <div id='round' onClick={ this.onClick }></div>
                     <span id='words' className={ this.state.isActive }>{ this.state.words }</span>
                </div>

                <div id='sidebar' className={ this.state.active }>
                   <div id='search'><img src='./img/mag.png' className='sign' style={{marginTop:'18px'}}/></div> 
                   <div id='add'><img src='./img/plus.png' className='sign'/></div> 
                   <div id='me'>
                      <span id='profile' style={{backgroundColor:'rgb(255,204,51)'}}></span>
                      {/* `${this.props.color}` */}
                      <span id='capital' key={this.props.loggedUser.id}>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span>
                      <span id='username'>{ this.props.loggedUser.name }</span>
                      <span className='status' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                   </div> 
                   <div id='contactList'>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(102,255,153)'}}></span>
                        <span className='individualCapital'>N</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>Sam Kwon</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(255,102,102)'}}></span>
                        <span className='individualCapital'>W</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>William Lee</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(102,255,153)'}}></span>
                        <span className='individualCapital'>N</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>Sam Kwon</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(255,102,102)'}}></span>
                        <span className='individualCapital'>W</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>William Lee</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(102,255,153)'}}></span>
                        <span className='individualCapital'>N</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>Sam Kwon</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(255,102,102)'}}></span>
                        <span className='individualCapital'>W</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>William Lee</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(102,255,153)'}}></span>
                        <span className='individualCapital'>N</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>Sam Kwon</span>
                    </div>
                    <div className='individualContact'>
                        <div className={this.state.delete}></div>
                        <span className='close' onClick={this.individualDelte}></span>
                        <span className='individualProfile' style={{backgroundColor:'rgb(255,102,102)'}}></span>
                        <span className='individualCapital'>W</span>
                        <span className='individualStatus' style={{backgroundColor:'rgb(188,190,192)'}}></span>
                        <span className='individualName'>William Lee</span>
                    </div>
                   </div> 
                </div>
                <Talkpage/>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(Sidebar);