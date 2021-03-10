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
    
    return (<div className="flex flex-wrap bg-gray-200 rounded-full border-b-4 border-white text-right pr-10">
        
        {createdAt?(<span>{formatRelative(new Date(createdAt.seconds *1000),new Date())}</span>):null}
        <p>{message}</p> 
        {createdBy?<p>{createdBy}</p>:null}
        
    </div>
    );
    
};
export default Message;