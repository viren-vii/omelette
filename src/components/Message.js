import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
    createdAt = null,
    message = '',
    createdBy = '',
    adminMsg = null,
})=>{
    // console.log(createdAt);
    // console.log(text);
    // console.log(displayName);
    const arrowRight ={
        "width": "0",
        "height": "0", 
        "border-top": "16px solid transparent",
        "border-bottom": "16px solid transparent",
        "border-left": "20px solid rgba(229, 231, 235, var(--tw-bg-opacity))",
        "float":"right",
        "transform":"translate(7px)",
        
        //rgba(229, 231, 235, var(--tw-bg-opacity))
    };
    const arrowLeft ={
        "width": "0",
        "height": "0", 
        "border-top": "16px solid transparent",
        "border-bottom": "16px solid transparent",
        "border-right": "20px solid rgba(229, 231, 235, var(--tw-bg-opacity))",
        "float":"left",
        "transform":"translate(-7px)",
        
        //rgba(229, 231, 235, var(--tw-bg-opacity))
    };
    return (
    <>
    <div style={adminMsg?arrowLeft:arrowRight} className="mt-2"></div>
    <div className="block p-1 font-sans subpixel-antialiased font-light select-none">
        <div className={"rounded-2xl bg-gray-200 p-2 pr-5 pl-5 "+(adminMsg?"border-b-4 border-gray-400":"border-b-4 border-gray-300")}>
        <span className={"inline uppercase text-xs font-bold text-gray-500 text-opacity-20 hover:text-opacity-100 "+(adminMsg?"text-right":"text-left")}>
                    {createdAt?(<p>{formatRelative(new Date(createdAt.seconds *1000),new Date())}</p>):null}
                </span>
                <span className={"inline text-xs font-bold text-gray-500 text-opacity-20 hover:text-opacity-100 "+(adminMsg?"text-right":"text-left")}>
                    {createdBy?<p>{createdBy}</p>:null}
                </span>
            <div className="">
                <span className={"inline  "+(adminMsg?"text-left":"text-right")}><p>{message}</p></span>
                
            </div>
        </div>
    </div>
    </>
    );
    
};
export default Message;