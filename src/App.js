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
        apiKey: "AIzaSyAjiUxbUy0c7bbThDc3FVQZV4hdHgQyn7E",
        authDomain: "react-app-cc170.firebaseapp.com",
        projectId: "react-app-cc170",
        storageBucket: "react-app-cc170.appspot.com",
        messagingSenderId: "836201567269",
        appId: "1:836201567269:web:110009730f794a0a415bcc",
        measurementId: "G-YQ4LMNF37Y"
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
                if(days>5){
                    doc.ref.delete();
                }
        })
    }});
        
function App() {
    return ( 
    <div >
        {
            <Homepage db={db}/>
            /* {user ? (
            <>
            <Channel user={user} db={db}/>
            </>
        ):( 
            <Homepage/>
        )} */}
    </div>
    );
}

export default App;