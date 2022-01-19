// import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function FriendBtn({ viewedUserId, loggedInUserid }) {
    const [btnText, setBtnText] = useState("");
    const [viewedId, setViewedId] = useState(viewedUserId);
    const [loggedInUserID, setLoggedInUserID] = useState(loggedInUserid);

    // const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        // setBtnText("add User");
        console.log("viewedUserId in friendBtn: ", viewedId);
        fetch(`/friendship-status/${viewedId}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("data in friendship status fetch: ", data);
                // TODO: Why is loggedInUserId undefined
                console.log("Logged in user Id after fetch: ", loggedInUserID);

                if (data.data) {
                    if (data.data.accepted) {
                        setBtnText("End Friendship");
                    } else if (loggedInUserID === data.data.recipient_id) {
                        setBtnText("Accept Request");
                    } else {
                        setBtnText("Pending | Cancel Request");
                    }
                } else {
                    setBtnText("Add User");
                }
            })
            .catch((err) => {
                console.log("error in find friendship: ", err);
            });
    }, []);

    // useEffect(() => {
    //     console.log("btn text after it was changed: ", btnText);
    // }, [btnText]);

    const handleBtnClick = () => {
        console.log("btn text after it was clicked: ", btnText);
        console.log("viewedId in post route: ", viewedId);

        fetch(`/api/friendship`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ btnText, viewedId }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log("data after POST", data);

                // INFO: (data.data && data.data.accepted can also be written as data.data?.accepted)
                if (data.data?.accepted && data.friendshipAccepted) {
                    setBtnText("End Friendship");
                }

                if (!data.data?.accepted) {
                    setBtnText("Pending | Cancel Request");
                }

                if (data.friendshipDeleted) {
                    setBtnText("Add User");
                }

                // if (data.friendshipAccepted) {
                //     setBtnText("Add User");
                // }
                // } else if (data.data.accepted === false) {
                //     setBtnText("Pending | Cancel Request");
                // }

                // TODO: if i accept the friendship status switch to end Friendship
            })
            .catch((err) => {
                console.log("error in fetch post friendship", err);
            });
    };

    return (
        <button id="friend-btn" onClick={() => handleBtnClick()}>
            {btnText}
        </button>
    );
}
