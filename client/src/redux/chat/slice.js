export function messagesReducer(messages = [], action) {
    if (action.type == "messages/receivedMessages") {
        // console.log("new chat message received in Reducer 3");
        messages = action.payload.messages;

    } else if (action.type == "message/receivedMessage") {
        console.log("new chat message received in Reducer 3");
        const newMessages = [...action.payload.message, ...messages ];
        console.log("messages Object in chatMessageReceived 3: ", newMessages);
        return newMessages;
    }
    console.log("State in Reducer: ", messages);
    return messages;
}


// ********************* ACTIONS ***********************

export function chatMessagesReceived(messages) {
    // console.log("messages in 2", messages);
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

