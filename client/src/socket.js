
import {io} from "socket.io-client";

// import {
//     chatMessagesReceived,
//     chatMessageReceived,
// } from "./redux/messages/slice.js";

// damit ich darauf zugreifen kann, muss das socket exportiert werden
export let socket;

export const init = (store) => {
    // checkts whether i have a socket connection, if not, it creates one
    if (!socket) {
        socket = io.connect();

        // socket.on("test", (data) => {
        //     console.log("data", data);
        // });

        // TODO: action creaters, waiting for messages from the server to forward them
        // socket.on("chatMessages", (msgs) =>
        //     store.dispatch(chatMessagesReceived(msgs))
        // );

        // socket.on("chatMessage", (msg) =>
        //     store.dispatch(chatMessageReceived(msg))
        // );

        // socket.on("newChatMessage", "Heeellööööö from the client");
    }
};
