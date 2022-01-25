export function wallReducer(wallMessages = [], action) {
    if (action.type == "messages/receivedWallMessages") {
        wallMessages = action.payload.wallMessages;
    } else if (action.type == "message/receivedWallMessage") {
        const newMessages = [...action.payload.message, ...wallMessages];
        return newMessages;
    }
    console.log("3", wallMessages);
    return wallMessages;
}

// ********************* ACTIONS ***********************

export function wallMessagesReceived(wallMessages) {
    console.log("2", wallMessages);
    return {
        type: "messages/receivedWallMessages",
        payload: { wallMessages },
    };
}

export function wallMessageReceived(wallMessage) {
    return {
        type: "message/receivedWallMessage",
        payload: { wallMessage },
    };
}
