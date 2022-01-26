export function wallReducer(wallMessages = [], action) {
    if (action.type == "messages/receivedWallMessages") {
        wallMessages = action.payload.wallMessages;
    } else if (action.type == "message/receivedWallMessage") {
        const newMessages = [...action.payload.wallMessage, ...wallMessages];
        return newMessages;
    }
    return wallMessages;
}

// ********************* ACTIONS ***********************

export function wallMessagesReceived(wallMessages) {
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