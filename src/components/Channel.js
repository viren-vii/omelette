import React, { useState, useEffect, useRef} from 'react';
import firebase from 'firebase/app';
import Message from './Message';

const Channel = ({user = null, serverId = null, db = null})=>{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [color, setColor] = useState('');

    async function getJokes(){
        const url = "https://icanhazdadjoke.com/";
        const jokeData = await fetch(url,
            {headers:{
                'Accept':'application/json'
            }});
        // console.log(jokeData);
        const jokeObj = await jokeData.json();
        // console.log(jokeObj.joke);

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : jokeObj.joke,
                createdBy : "Admin~joke requested by: "+user,
            })
        }
    }
    
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    // if (window.scrollY > 400) {
    //     setColor('black');
    // } else {
    //     setColor('white');
    // }
      
    
    //   useEffect(()=> {
    //     window.addEventListener('scroll', this.listenScrollEvent)
    //   });

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
                        id:doc.id,
                    }));
                    setMessages(data);
                    // console.log(data);
                })
                return unsubscribe;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[db]);
    const handleOnChange = e =>{
        console.log("onchange "+e.target.value);
        setNewMessage(e.target.value);
    };

    const click = () =>{
        console.log(click);
        alert("alert");
    }

    const handleOnSubmit = () =>{
        // e.preventDefault();
        console.log(newMessage);

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : newMessage,
                createdBy : user,
            })
        }
    };
    const msgHubStyle = {
        "bottom":"0px",
        "position":"fixed",
        "left":"50%",
        "transform":"translateX(-50%)",

    };
    return (
        <>
        {/* <div className="text-center h-full bg-black">
            
            <div className="w-11/12 md:w-6/12 lg:w-4/12 m-auto bg-white ">
                <ul>
                {messages.map(messages =>(
                    <li key={messages.id}><Message {...messages}/></li>
                ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
        </div> */}
        
        <div className="text-center bg-black">
        <div className="" style={msgHubStyle}>
                <div className="bg-white p-2 w-11/12 md:w-6/12 lg:w-4/12 bg-white ">
                    <div className="border-2 rounded-full mb-2">
                        <form onSubmit = {handleOnSubmit} className="flex">
                            <input 
                            type="text" 
                            value={newMessage} 
                            onChange={handleOnChange} 
                            placeholder="Your message goes here..." 
                            className="flex-grow rounded-full p-2 pt-1 pb-1 focus:shadow-inner placeholder-gray-300 text-gray-900 font-bold mr-1"
                            />
                            <button type="submit" disabled={!newMessage} className="transform transition duration-300 hover:bg-gray-200 hover:-rotate-90 flex-initial rounded-full border-2 bg-white p-4 font-black disabled:opacity-20 disabled:cursor-not-allowed">
                                <img src='img/send.png' alt='send' className='h-6'/>
                            </button>
                        </form>
                    </div>
        
                    <button className="bg-black text-white">Down {color}</button>
                    <div className="flex clear-both border-2 rounded-full p-2 space-x-4">
                            <button onClick={getJokes} className="transition duration-300 flex-1 p-2  rounded-full border font-bold hover:bg-gray-900 hover:text-white hover:border-0">
                                <img src='img/smile.svg' className="h-6 float-left" alt='getJoke!'/> Get a joke 
                            </button>
                            <button onClick={getJokes} className="transition duration-300 flex-1 p-2  rounded-full border font-bold hover:bg-gray-900 hover:text-white hover:border-0">
                                <img src='img/smile.svg' className="h-6 float-left" alt='getJoke!'/> Get a joke 
                            </button>
                    </div>
                </div>
        </div>
        </div>
            
        


       
        </>
    );
};

export default Channel;


