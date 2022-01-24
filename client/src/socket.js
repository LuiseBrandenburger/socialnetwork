
import {io} from "socket.io-client";

import {
    chatMessagesReceived,
    chatMessageReceived,
} from "./redux/chat/slice.js";

// damit ich darauf zugreifen kann, muss das socket exportiert werden
export let socket;

export const init = (store) => {
    // checkts whether i have a socket connection, if not, it creates one
    if (!socket) {
        socket = io.connect();

        // TODO: action creaters, waiting for messages from the server to forward them
        // Socket zum hören auf alle Messages aus der Datenbank

        socket.on("chatMessages", (messages) => {
            
            console.log("messages from server send to socket 1", messages);
            store.dispatch(chatMessagesReceived(messages));
        }
        );

        // socket.on("chatMessage", (message) =>
        //     store.dispatch(chatMessageReceived(message))
        // );

    }
};
