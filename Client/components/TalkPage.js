import React, { Component } from 'react';
import { connect } from 'react-redux';

class TalkPage extends Component{
    constructor(props){
        super(props);
    }

    render() {
        // console.log('----------', this.props.loggedUser);
        return(
            <div>
                    {this.props.users.map(user=>{
                        if(user.id===this.props.loggedUser.id){
                          return  user.contacts.map(contact=>{
                                // console.log('=======',contact.name)
                                return(
                                    <h2 key={contact.id}>{contact.name}</h2>
                                )
                            })

                        }
                    })}
            </div>
        )
    }
}

const mapState =(state)=>({loggedUser:state.currentUser,users:state.users})

export default connect(mapState)(TalkPage);