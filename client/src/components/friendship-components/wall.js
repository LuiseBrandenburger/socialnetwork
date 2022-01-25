import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { socket } from "../../socket";
import ShowFriends from "./showFriends";

export default function Wall({ userId }) {
    const dispatch = useDispatch();

    const textareaRef = useRef();
    const chatContainerRef = useRef();

    const wallMessages = useSelector((state) => {
        return state && state.wallMessages;
    });

    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [wallMessages]);

    // console.log("wallMessages aus state", wallMessages);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);

            // socket.emit("newWallMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="wall-container">
            <ShowFriends userId={userId} />
            <div className="chat-room">
                <div className="chat-container" ref={chatContainerRef}>
                    {/* MESSAGES OLNY FROM FRIENDS */}

                    {wallMessages.map((wallMessage) => {
                        return (
                            <div
                                className={
                                    userId === wallMessage.id
                                        ? "user-message"
                                        : "messages"
                                }
                                key={wallMessage.wallmessageid}
                            >
                                <img
                                    className="chat-avatar"
                                    src={wallMessage.url || "/default.png"}
                                    alt={
                                        wallMessage.first +
                                        " " +
                                        wallMessage.last
                                    }
                                />
                                <div>
                                    <p>{wallMessage.wallmessage}</p>
                                    <p className="message-date">
                                        {wallMessage.dateAddedComment}
                                    </p>
                                </div>
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
        </div>
    );
}

