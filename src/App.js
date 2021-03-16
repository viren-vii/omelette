import React, { useState, useEffect } from 'react';
//Components
import Button from './components/Button';
import Channel from './components/Channel';
import Homepage from './components/Homepage'
//Firebase dependencies
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = firebase.firestore();
var now = new Date();
// console.log(now);
const serverRef = db.collection('servers');
var servers = serverRef.get().then(snapshot=>{
    if(!snapshot.exists){
        snapshot.forEach(doc=>{
                const date = doc.data().createdAt.toDate();
                const days = Math.round((now-date)/(60*60*24*1000));
                // console.log(doc.id,'=>', date);
                // console.log(now);
                // console.log(date);
                // console.log(Math.round((now-date)/(60*60*24*1000)));
                if(days>2){
                    doc.ref.delete();
                }
        })
    }});
        
function App() {
    return ( 
    <>
        <div>
            {<Homepage db={db}/>}
        </div>
    </>
    );
}

export default App;