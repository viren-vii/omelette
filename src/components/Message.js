import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    message = '',
    createdBy = '',
})=>{
    // console.log(createdAt);
    // console.log(text);
    // console.log(displayName);
    
    return (<div>
        
        {createdAt?(<span>{formatRelative(new Date(createdAt.seconds *1000),new Date())}</span>):null}
        <p>{message}</p> 
        {createdBy?<p>{createdBy}</p>:null}
        
    </div>
    );
    
};
export default Message;