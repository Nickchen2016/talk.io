import React, { Component } from 'react';
import { connect } from 'react-redux';


class TalkPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: '',
            isActive: '',
            words: ''
        }
        this.onClick= this.onCLick.bind(this);
        this.mouseOver= this.mouseOver.bind(this);
        this.mouseLeave= this.mouseLeave.bind(this);
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
        // console.log('----------', typeof this.props.loggedUser.name);
        return(
            <div className='talk-container'>
                <div id='sidebar' className={ this.state.active }>
                   <div id='search'><img src='./img/mag.png' className='sign' style={{marginTop:'18px'}}/></div> 
                   <div id='add'><img src='./img/plus.png' className='sign'/></div> 
                   <div id='me'>
                      <span style={{margin:'10px',fontFamily:'sans-serif',borderRadius:'50%',border:'1px solid rgb(0,0,255)',height:'33px',width:'33px',backgroundColor:'rgb(255,204,51)'}}></span>
                      {/* `${this.props.color}` */}
                      <span id='capital' key={this.props.loggedUser.id}>{this.props.loggedUser.name&&this.props.loggedUser.name[0].toUpperCase()}</span>
                      <span id='username'>{ this.props.loggedUser.name }</span>
                      <span className='status'></span>
                   </div> 
                   <div id='pointer' onMouseOver={ this.mouseOver } onMouseLeave={ this.mouseLeave }>
                     <div id='round' onClick={ this.onClick }></div>
                     <span id='words' className={ this.state.isActive }>{ this.state.words }</span>
                   </div>
                   <div id='friends'>
                    
                   </div> 
                </div>
                <div>dfyguhkjkl</div>
                <div>
                        {this.props.users.map(user=>{
                            if(user.id===this.props.loggedUser.id){
                                // console.log(user);
                            return  user.contacts.map(contact=>{
                                    return(
                                        <h2 key={contact.id}>{contact.name}</h2>
                                    )
                                })
                            }
                        })}
                </div>
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(TalkPage);