
import React from 'react';
import Channel from './Channel'
import firebase from 'firebase/app';

class Homepage extends React.Component {
    username = null;
    serverId = null;
    constructor(props){
      super(props); 
      this.state = { username: '', set: false, greeting: '', btn:'', code:'', done: false };
    }
    handleChange = event => {
      this.setState({ username: event.target.value });
    };
    handleChangeCode = event =>{
      this.setState({code : event.target.value});
    }
    
    handleOnSubmitUsername = event =>{
      event.preventDefault();
      this.username = this.state.username;
      console.log(this.username);
      this.setState({ username: event.target.value, set:true, greeting: 'Hello '+this.state.username+' !'});
    }
    handleRoom = event =>{
      event.preventDefault();
      this.setState({btn:event.target.value, done: true});
      this.serverId = this.state.code;
      const serverRef = this.props.db.collection('servers');

      serverRef.doc(this.serverId).set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: this.username,
      });
      serverRef.doc(this.serverId).collection('messages').add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        message:"Welcome "+this.username+"!",
        createdBy: this.username,
      });
      this.setState({ done: true });
    }
   
    render() {
      return (
        <>
          {!this.state.done ? (
            <>
              <form onSubmit = {this.handleOnSubmitUsername}>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Your username goes here..."
                />
              <button type="submit" disabled={!this.state.username}>Set The Username</button><br></br>
              </form>
              <p>{this.state.greeting}</p>
              <form>
              {this.state.set &&
                <input
                  type="text"
                  name="serverCode"
                  onChange={this.handleChangeCode}
                  disabled={!this.state.set}
                  placeholder="Enter Server Code"
                />
              }
              <br></br>
              {this.state.code && 
                <>
                  <button value="create" onClick = {this.handleRoom} type="submit" disabled={!this.state.set}>CREATE ROOM</button>
                  <button value="join" onClick = {this.handleRoom} type="submit" disabled={!this.state.set}>JOIN ROOM</button><br></br>
                </>
              }
              </form>
            </>
          ):(
            <Channel user={this.username} serverId={this.serverId} db={this.props.db}/>
          )}
        </>
      );
    }
   }
   export default Homepage;