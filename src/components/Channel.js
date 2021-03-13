import React, { useState, useEffect, useRef} from 'react';
import firebase from 'firebase/app';
import Message from './Message';
import Picker from 'emoji-picker-react';

const Channel = ({user = null, serverId = null, db = null})=>{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [displayDownButton, setDownButton] = useState(false);
    const [pickerOpen, pickerToggle] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setNewMessage(newMessage+emojiObject.emoji);
    };
      
    const toggle = (e) =>{
        e.preventDefault();
        pickerToggle(!pickerOpen);
    }

    
    const handleScroll = () =>{
        // console.log(window.pageYOffset);
        // console.log(window.scrollY);
        // console.log(document.body.offsetHeight);
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        if(bottom){
            setDownButton(false);
        }else{
            setDownButton(true);
        }
        
    }
    window.addEventListener('scroll', handleScroll);

    async function getJokes(){
        const url = "https://icanhazdadjoke.com/";
        const jokeData = await fetch(url,
            {headers:{
                'Accept':'application/json',
            }});
        // console.log(jokeData);
        const jokeObj = await jokeData.json();
        // console.log(jokeObj.joke);

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : jokeObj.joke,
                createdBy : "Admin~joke requested by: "+user,
                adminMsg : true,
            })
        }
    }
    async function getFacts(){
        const url = "https://cors-anywhere.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json";

        // var xmlHttp = new XMLHttpRequest();
        // xmlHttp.open( "GET", url, true ); // false for synchronous request
        // xmlHttp.send( null );
        // console.log(xmlHttp.responseText);

        const factData = await fetch(url,
            {headers:{
                'Content-Type':'application/json',
            }});
        // factData.header("Access-Control-Allow-Origin", "*");
        // factData.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        const factObj = await factData.json();
        console.log(factObj.insult);

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : factObj.insult,
                createdBy : "Admin~insult requested by: "+user,
                adminMsg : true,
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
        setNewMessage(e.target.value);

    };

    const handleOnSubmit = e =>{
        e.preventDefault();
        setNewMessage("");
        console.log(newMessage);

        if(db){
            db.collection('servers').doc(serverId).collection('messages').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                message : newMessage,
                createdBy : user,
                adminMsg : false,
            })
        }
    };
    const msgHubStyle = {
        "bottom":"0px",
        "position":"fixed",
        "left":"50%",
        "transform":"translateX(-50%)",

    };
    const bounceBtnStyle = {
        "bottom":"10em",
        "position":"fixed",
        "left":"49%",
        "transform":"translateX(-50%)",
    };
    const pickerStyle = {
        "bottom":"10em",
        "position":"fixed",
        "left":"50%",
        "transform":"translateX(-50%)",
    }
    
    return (
        <>
        <div className="h-full text-center h-full mb-36">
            <div className="w-11/12 md:w-6/12 lg:w-4/12 m-auto bg-white">
                <ul className="">
                {messages.map(messages =>(
                    <li key={messages.id}><Message {...messages}/></li>
                ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
        </div>
        
        
        {/* mt-36 */}
        {displayDownButton?<button className="animate-bounce focus:outline-none" style={bounceBtnStyle} onClick={scrollToBottom}>
            <img src='img/down.png' className="h-9 float-left" alt='go down'/>
        </button>: null}
        {pickerOpen?(<div style={pickerStyle}><Picker onEmojiClick={onEmojiClick}/></div>):null}
        <div className="w-screen text-center" >
                <div className="text-center bg-white p-2 w-11/12 md:w-6/12 lg:w-4/12 " style={msgHubStyle}>
                    <div className="bg-white">
                    <div className="border-2 rounded-full mb-2" >
                        <form onSubmit = {handleOnSubmit} className="flex" >
                            <input 
                            type="text" 
                            value={newMessage} 
                            onChange={handleOnChange} 
                            placeholder="Your message goes here..." 
                            className="flex-grow rounded-full p-2 pt-1 pb-1 focus:shadow-inner placeholder-gray-300 text-gray-900 font-bold mr-1"
                            />
                            <button onClick={toggle} className="transform focus:outline-none transition duration-300 hover:scale-150 flex-initial">
                                <img src='img/smiling.png' alt='emojis' className='h-6'/>
                            </button>
                            <button type="submit" disabled={!newMessage} className="transform focus:outline-none transition duration-300 hover:bg-gray-200 hover:-rotate-90 flex-initial rounded-full border-2 bg-white p-4 font-black disabled:opacity-20 disabled:cursor-not-allowed">
                                <img src='img/send.png' alt='send' className='h-6'/>
                            </button>
                        </form>
                    </div>
                    {/* <span>You chose: {chosenEmoji.emoji}</span> */}
                    <div className="flex clear-both border-2 rounded-full p-2 space-x-4">
                            <button onClick={getJokes} className="transition duration-300 flex-1 p-2 focus:outline-none rounded-full border font-bold hover:bg-gray-900 hover:text-white hover:border-0">
                                <img src='img/smile.svg' className="h-6 float-left" alt='getJoke!'/> Get a joke 
                            </button>
                            <button onClick={getFacts} className="transition duration-300 flex-1 p-2 focus:outline-none rounded-full border font-bold hover:bg-gray-900 hover:text-white hover:border-0">
                                <img src='img/smile.svg' className="h-6 float-left" alt='getJoke!'/> Get a insult 
                            </button>
                    </div>
                </div>
                </div>
        </div>
        
    
            
        


       
        </>
    );
};

export default Channel;


