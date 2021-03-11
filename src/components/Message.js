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
    
    return (
    <div className="block p-1">
        <div className="bg-gray-200 rounded-2xl border-b-4 p-2 pr-5 ">
        <span className="text-left inline uppercase text-xs font-bold text-gray-500 text-opacity-20 hover:text-opacity-100 ">
                    {createdAt?(<p>{formatRelative(new Date(createdAt.seconds *1000),new Date())}</p>):null}
                </span>
                <span className="text-left inline text-xs font-bold text-gray-500 text-opacity-20 hover:text-opacity-100">
                    {createdBy?<p>{createdBy}</p>:null}
                </span>
            <div className="">
                <span className="text-right inline"><p>{message}</p></span>
                
            </div>
        </div>
    </div>
    );
    
};
export default Message;