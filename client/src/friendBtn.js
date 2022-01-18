// import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function FriendBtn({ viewedUserId }) {
    const [btnText, setBtnText] = useState("");
    const [viewedId, setViewedId] = useState(viewedUserId);

    useEffect(() => {
        console.log("Friend Btn Mounted: ");
        // setBtnText("add User");
        console.log("viewedId in Params:", viewedId);

        fetch(`/friendship-status/${viewedId}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("data in friednship status fetch: ", data);
                if (data.data) {
                    // if there is data. there is a request

                    if (data.data.accepted) {
                        setBtnText("End Friendship");
                    } else{
                        setBtnText("Pending | Cancel Request");
                    }

                    // if (accepted) {
                    // if accepted is true the button should say end friendship
                    // } else {
                    // if there is data we need to check weather accepted it true or false. if its false render "pending",
                    // }
                } else {
                    setBtnText("Add User");
                    // if the db returned values are an empty array, there's no friendship between the two users, and our component's buttong should render the make friend request button
                    // if there is no data, the user can add the other user
                }
            })
            .catch((err) => {
                console.log("error in find friendship: ", err);
            });
    }, []);

    useEffect(() => {

        console.log("btn text after it was clicked: ", btnText);

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
                if (data.data.accepted === false) {
                    setBtnText("Pending | Cancel Request");
                }

            })
            .catch((err) => {
                console.log("error in fetch post friendship", err);
            });

        // return () => {
        //     cleanup
        // }
    }, [btnText]);

    return (
        <button id="friend-btn" onClick={() => setBtnText("Add User")}>
            {btnText}
        </button>
    );
}
