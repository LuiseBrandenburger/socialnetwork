export function messagesReducer(messages = null, action) {
    if (action.type == "messages/receivedMessages") {
        messages = action.payload.messages;
    } else if (action.type == "chatMessageReceived") {
        console.log("new chat message received in Reducer");

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
    console.log("message in 2", message);

    return {
        type: "message/receivedMessage",
        payload: { message },
    };
}
