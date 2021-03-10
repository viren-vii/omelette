
import React from 'react';
import Channel from './Channel'
import firebase from 'firebase/app';

class Homepage extends React.Component {
    username = null;
    serverId = null;
    constructor(props){
      super(props); 
      // set false greeting null code empty
      this.state = { username: '', greeting: '', btn:'', code:'', done: false };
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
              <div className="h-screen text-center">
              <h1 className="text-9xl font-black mt-0 mb-2 text-gray-50 text-shadow-md">Omlette</h1>
                <div className="m-auto">
                  <form onSubmit = {this.handleOnSubmitUsername} className="text-center m-auto w-11/12 sm:w-7/12 shadow-xl rounded-xl p-10 pt-10 pb-28 border border-gray-100">
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder="Your username goes here..."
                      className = "focus:shadow-inner p-4 rounded-xl border border-gray-100 placeholder-gray-300 text-gray-900 font-bold"
                    /><br></br>
                  <button type="submit" disabled={!this.state.username} className="transition duration-500 ease-in-out text-center  bg-white-500 text-gray-900 font-bold p-5 shadow-xl rounded-full hover:opacity-50 disabled:opacity-20 disabled:cursor-not-allowed">Set The Username</button><br></br>
                  </form>
                </div>
              <>
                {this.state.greeting ? 
                <div className="bg-gray-50 m-auto w-11/12 sm:w-7/12 shadow-2xl rounded-2xl mt-8">
                  <p className="font-sans subpixel-antialiased font-bold p-20 text-6xl text-gray-400">{this.state.greeting}</p>
                </div> : <div></div>}
              </>
              <div className={this.state.greeting?"visible":"invisible"}>
                <form className="mt-12">
                {this.state.greeting &&
                  <input
                    type="text"
                    name="serverCode"
                    onChange={this.handleChangeCode}
                    disabled={!this.state.greeting}
                    placeholder="Enter Server Code"
                    className = "focus:shadow-inner p-4 rounded-xl border border-gray-100 placeholder-gray-300 text-gray-900 font-bold"
                  />
                }
                <br></br>
                    <button value="create" onClick = {this.handleRoom} type="submit" disabled={!this.state.code} className="transition duration-500 ease-in-out w-44 text-center  bg-white-500 text-gray-900 font-bold p-5 shadow-xl rounded-full disabled:opacity-20 hover:opacity-50 disabled:cursor-not-allowed">CREATE ROOM</button>
                    <button value="join" onClick = {this.handleRoom} type="submit" disabled={!this.state.code} className="transition duration-500 ease-in-out w-44 text-center  bg-white-500 text-gray-900 font-bold p-5 shadow-xl rounded-full disabled:opacity-20 hover:opacity-50 disabled:cursor-not-allowed">JOIN ROOM</button><br></br>
                </form>
              </div>
              </div>
            </>
          ):(
            <Channel user={this.username} serverId={this.serverId} db={this.props.db}/>
          )}
        </>
      );
    }
   }
   export default Homepage;