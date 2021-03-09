import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import Message from './Message';


const Channel = ({user = null, serverId = null, db = null})=>{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    async function getJokes(){
        const url = "https://icanhazdadjoke.com/";
        const jokeData = await fetch(url,
            {headers:{
                'Accept':'application/json'
            }});
        // console.log(jokeData);
        const jokeObj = await jokeData.json();
        console.log(jokeObj.joke);
    }
    
    
    

    useEffect(()=>{
        if(db){
            const unsubscribe = db
                .collection('servers')
                .doc(serverId)
                .collection('messages')
                .orderBy('createdAt')
                .limit(100)
                .onSnapshot(querySnapshot =>{
                    const data = querySnapshot.docs.map(doc=>({
                        ...doc.data(),
                    }));
                    setMessages(data);
                    // console.log(data);
                })
                return unsubscribe;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[db]);

    const handleOnChange = e =>{
        setNewMessage(e.target.value);
    };
    const handleOnSubmit = e =>{
        e.preventDefault();

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : newMessage,
                createdBy : user,
            })
        }
    }
    getJokes();
    return (
        <>
        <ul>
        {messages.map(messages =>(
            <li key={messages.id}><Message {...messages}/></li>
        ))}
        </ul>
        <form onSubmit = {handleOnSubmit}>
            <input type="text" value={newMessage} onChange={handleOnChange} placeholder="Your message goes here..."/>
            <button type="submit" disabled={!newMessage}>Send</button>
            <button onClick={getJokes()}>Get a joke!</button>
        </form>
        </>
    );
};

export default Channel;