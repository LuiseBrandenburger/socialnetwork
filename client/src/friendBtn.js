import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function FriendBtn({viewedUserId}) {
    const [btnText, setBtnText] = useState("");

    useEffect(() => {
        console.log("Friend Btn Mounted: ");
        setBtnText("add User");
        console.log("viewedUserId in Params:", viewedUserId);
    }, []);


    return <button id="friend-btn">{btnText}</button>;
}
