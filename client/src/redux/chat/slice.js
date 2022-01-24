export function messagesReducer(messages = null, action) {
    // if (action.type == "messages/receivedMessages") {
    //     messages = action.payload.messages;
    // } else if (action.type === "message/receivedMessage") {
    //     console.log("messages in receivedMessages: ", messages);
    //     const newMessages = messages.map((message) => {
    //         if (message.id === action.payload.id) {
    //             return {
    //                 ...message,
    //                 accepted: true,
    //             };
    //         }
    //         return message;
    //     });
    //     console.log("newMessages:", newMessages);
    //     return newMessages;
    // } 
    // console.log("new messages:", messages);
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
