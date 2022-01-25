export function messagesReducer(messages = [], action) {
    if (action.type == "messages/receivedMessages") {
        messages = action.payload.messages;

    } else if (action.type == "message/receivedMessage") {
        const newMessages = [...action.payload.message, ...messages ];
        return newMessages;
    }
    return messages;
}


// ********************* ACTIONS ***********************

export function chatMessagesReceived(messages) {
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

