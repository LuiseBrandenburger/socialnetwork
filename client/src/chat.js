import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";
// import { chatMessagesReceived } from "./redux/chat/slice.js";

export default function Chat({userId}) {
    const dispatch = useDispatch();

    const textareaRef = useRef();
    const chatContainerRef = useRef();

    const chatMessages = useSelector((state) => {
        return state && state.messages;
    });

    console.log(userId);

    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chatMessages]);

    console.log("chatMessages aus state", chatMessages);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);

            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-container" ref={chatContainerRef}>
                {chatMessages.map((chatMessage) => {
                    return (
                        <div
                            className={
                                userId === chatMessage.id
                                    ? "user-message"
                                    : "messages"
                            }
                            key={chatMessage.messageid}
                        >
                            <img
                                className="chat-avatar"
                                src={chatMessage.url || "/default.png"}
                                alt={chatMessage.first + " " + chatMessage.last}
                            />
                            <p>{chatMessage.message}</p>
                            {/* <p> {chatMessage.created_at}</p> */}
                        </div>
                    );
                })}
            </div>
            <textarea
                ref={textareaRef}
                onKeyDown={keyCheck}
                name="message"
                id="message"
                placeholder="add message here"
            ></textarea>
        </div>
    );
}
