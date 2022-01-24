import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";
// import { chatMessagesReceived } from "./redux/chat/slice.js";




export default function Chat() {
    const dispatch = useDispatch();

    const textareaRef = useRef();
    const chatContainerRef = useRef();

    // const chatMessages = useSelector((state) => {
    //     state && state.chat;
    // });

    // const [chatMessages, setChatMessages] = useState([
    //     "hello i am a message",
    //     "hello i am a message",
    //     "hello i am a message",
    // ]);

    useEffect(() => {

        socket.on("hello", (message) => console.log(message));

    }, []);


    const keyCheck = (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);

            // this value is our text node
            // textareaRef.current.value;
            // textareaRef.current.style.backgroundColor = "green";
            // textareaRef.current.style.cssText = `
            //     background-color: green;
            //     font-size: 34px;
            // `;
            // socket.emit("newChatMessage", e.target.value);
            // e.target.value = "";
        }
    };

    return (
        <div className="chat-room">
            <h1>I am in Chat Page</h1>
            <div className="chat-container" ref={chatContainerRef}>
                <p>Hellööö</p>
                <p>This is a chat message</p>
                <p>This is a chat message</p>
                <p>This is a chat message</p>

                {/* use map to show all messages */}
                {/* styles: overflowY scroll damit man hoch und runter scrollen kann */}
            </div>
            <textarea
                ref={textareaRef}
                // onKeyDown={keyCheck}
                onKeyUp={keyCheck}
                name="message"
                id="message"
                cols="40"
                rows="3"
                placeholder="add message here"
            ></textarea>
        </div>
    );
}
