export function messagesReducer(messages = null, action) {
    console.log("im in messageReducer");
    if (action.type == "messages/receivedMessages") {
        messages = action.payload.messages;
    } 
    
    // console.log("messages in messagesReducer 3", messages);
    return messages;
}


// ********************* ACTIONS ***********************

export function chatMessagesReceived(messages) {
    console.log("messages in 2", messages);

    return {
        type: "messages/receivedMessages",
        payload: { messages },
    };
}

export function chatMessageReceived(message) {
    return {
        type: "message/receivedMessage",
        payload: { message },
    };
}
