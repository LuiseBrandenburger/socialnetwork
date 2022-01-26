import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { socket } from "../../socket";

export default function OtherProfileWall({ wallId, userId }) {

    const textareaRef = useRef();
    const chatContainerRef = useRef();

    const wallMessages = useSelector((state) => {
        return state && state.wallMessages;
    });

    useEffect(() => {
        socket.emit("wallId", wallId);
    }, []);

    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [wallMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);

            let messageObject = {
                message: e.target.value,
                wallId: wallId,
            };

            socket.emit("newfriendWallMessage", messageObject);
            e.target.value = "";
        }
    };

    return (
        <div className="wall-container">
            <div className="chat-room">
                <h2>Friendship Wall</h2>
                <div className="chat-container" ref={chatContainerRef}>
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
