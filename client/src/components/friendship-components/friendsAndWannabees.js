// import {useDispatch, useSelector}
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptFriendship,
    receiveFriendsAndWannabees,
    endFriendship,
} from "../../redux/friends-and-wannabees/slice.js";

export default function FriendsAndWannabees({ userId }) {
    const dispatch = useDispatch();

    const friendsAndWannabees = useSelector(
        (state) => state.friendsAndWannabees
    );

    const currentFriends = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendsAndWannabees) => friendsAndWannabees.accepted == true
            )
    );

    const friendWannabees = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendsAndWannabees) =>
                    friendsAndWannabees.accepted == false &&
                    friendsAndWannabees.id === friendsAndWannabees.senderid
            )
    );

    const sendOutFriendRequests = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendsAndWannabees) =>
                    friendsAndWannabees.accepted == false &&
                    friendsAndWannabees.senderid === userId
            )
    );

    useEffect(() => {
        fetch(`/friends-and-wannabees`)
            .then((data) => data.json())
            .then(({ data }) => {
                dispatch(receiveFriendsAndWannabees(data));
            })
            .catch((err) => {
                location.replace("/");
                console.log("error in find Friends: ", err);
            });
    }, []);

    if (!friendsAndWannabees) {
        return null;
    }

    const handleAcceptClick = (viewedId) => {
        
        fetch(`/api/friendship`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ btnText: "Accept Request", viewedId }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.friendshipAccepted) {
                    const action = acceptFriendship(viewedId);
                    dispatch(action);
                }
            })
            .catch((err) => {
                console.log("error in fetch post friendship", err);
            });
    };

    const handleEndFriendshipClick = (viewedId, btnText) => {
        console.log("handleAcceptClick has been clicked! id:", viewedId);

        fetch(`/api/friendship`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ btnText: btnText, viewedId }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.friendshipDeleted) {
                    const action = endFriendship(viewedId);
                    dispatch(action);
                }
            })
            .catch((err) => {
                console.log("error in fetch post friendship", err);
            });
    };

    return (
        <div id="friends-and-wannabees-container">
            <h2>Friend Requests</h2>
            <div className="user-display-container">
                {friendWannabees &&
                    friendWannabees.map((friendWannabee) => (
                        <div className="user-box" key={friendWannabee.id}>
                            <Link
                                to={`/show-user/${friendWannabee.id}`}
                                key={friendWannabee.id}
                            >
                                <h2 id="user-name">{friendWannabee.first}</h2>
                                <img
                                    src={friendWannabee.url || "default.png"}
                                    alt={`social network profile picture of ${friendWannabee.first} ${friendWannabee.last}`}
                                />
                            </Link>
                            <button
                                onClick={() =>
                                    handleAcceptClick(friendWannabee.id)
                                }
                            >
                                Accept Request
                            </button>
                        </div>
                    ))}
            </div>

            <h2>My Friends</h2>
            <div className="user-display-container">
                {currentFriends &&
                    currentFriends.map((currentFriend) => (
                        <div className="user-box" key={currentFriend.id}>
                            <Link
                                to={`/show-user/${currentFriend.id}`}
                                key={currentFriend.id}
                            >
                                <h2 id="user-name">{currentFriend.first}</h2>
                                <img
                                    src={currentFriend.url || "default.png"}
                                    alt={`social network profile picture of ${currentFriend.first} ${currentFriend.last}`}
                                />
                            </Link>
                            <button
                                onClick={() =>
                                    handleEndFriendshipClick(
                                        currentFriend.id,
                                        "End Friendship"
                                    )
                                }
                            >
                                End Friendship
                            </button>
                        </div>
                    ))}
            </div>

            <h2>My Friend Requests</h2>
            <div className="user-display-container">
                {sendOutFriendRequests &&
                    sendOutFriendRequests.map((sendOutFriendRequest) => (
                        <div className="user-box" key={sendOutFriendRequest.id}>
                            <Link
                                to={`/show-user/${sendOutFriendRequest.id}`}
                                key={sendOutFriendRequest.id}
                            >
                                <h2 id="user-name">
                                    {sendOutFriendRequest.first}
                                </h2>
                                <img
                                    src={
                                        sendOutFriendRequest.url ||
                                        "default.png"
                                    }
                                    alt={`social network profile picture of ${sendOutFriendRequest.first} ${sendOutFriendRequest.last}`}
                                />
                            </Link>
                            <button
                                onClick={() =>
                                    handleEndFriendshipClick(
                                        sendOutFriendRequest.id,
                                        "Pending | Cancel Request"
                                    )
                                }
                            >
                                Pending | Cancel Request
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
