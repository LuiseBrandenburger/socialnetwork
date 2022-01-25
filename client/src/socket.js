import { io } from "socket.io-client";

import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/chat/slice.js";

import {
    wallMessagesReceived,
    wallMessageReceived,
} from "./redux/wall/slice.js";

// damit ich darauf zugreifen kann, muss das socket exportiert werden
export let socket;

export const init = (store) => {
    // checkts whether i have a socket connection, if not, it creates one
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (messages) => {
            // console.log("messages from server send to socket 1", messages);
            store.dispatch(chatMessagesReceived(messages));
        });

        socket.on("chatMessage", (message) => {
            // console.log("message from server send to socket 1", message);
            store.dispatch(chatMessageReceived(message));
        });

        socket.on("wallMessages", (wallMessages) => {
            // console.log("messages from server send to socket 1", wallMessages);
            store.dispatch(wallMessagesReceived(wallMessages));
        });

        socket.on("wallMessage", (wallMessage) => {
            // console.log("message from server send to socket 1", wallMessage);
            store.dispatch(wallMessageReceived(wallMessage));
        });
    }
};
