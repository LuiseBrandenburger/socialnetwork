// import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function FriendBtn({ viewedUserId, loggedInUserid }) {
    const [btnText, setBtnText] = useState("");
    const [viewedId, setViewedId] = useState(viewedUserId);
    const [loggedInUserID, setLoggedInUserID] = useState(loggedInUserid);

    useEffect(() => {
        // console.log("viewedUserId in friendBtn: ", viewedId);
        fetch(`/friendship-status/${viewedId}`)
            .then((data) => data.json())
            .then((data) => {
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
