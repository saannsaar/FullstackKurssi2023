import React from "react";

const MessageInfo = ({message}) => {
    if (message == null ) {
        return false
    }
    else if (message.includes("added")){
        return (
            <div id="successful">{message}</div>
        )
    } else if ( message.includes("Information")) {
        <div id="failed">{message}</div>
    }
}

export default MessageInfo