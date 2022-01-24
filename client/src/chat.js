import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";

export default function Chat() {
    const textareaRef = useRef();
    const chatContainerRef = useRef();

    // const chatMessages = useSelector((state) => {
    //     state && state.chat;
    // });

    const [chatMessages, setChatMessages] = useState([
        "hello i am a message",
        "hello i am a message",
        "hello i am a message",
    ]);

    // useEffect(() => {
    //     chatContainerRef.current.scrollTop =
    //         chatContainerRef.current.scrollHeight;
    // }, [chatMessages]);

    useEffect(() => {
        // socket.emit("newChatMessage", "Heeellööööö from the client");
    }, []);

    //   const chatMessages = useSelector((state) => {
    //       state?.chat;
    //   });

    const keyCheck = (e) => {
        if (e.target.value === "Enter") {
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
            e.target.value = "";
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
                onKeyDown={keyCheck}
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="add message here"
            ></textarea>
        </div>
    );
}
