import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import FriendBtn from "./friendBtn";
import OtherProfileWall from "./otherProfileWall";

export default function OtherProfile({ userId }) {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [friendship, setFriendship] = useState(false);

    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const history = useHistory();

    useEffect(() => {}, []);

    useEffect(() => {
        fetch(`/api/find-profile/${id}`)
            .then((data) => data.json())
            .then((data) => {
                if (redirectToProfile) {
                    history.replace("/");
                    setRedirectToProfile(false);
                } else {
                    setUser(data.data);
                    // console.log("user in other Profile",user);
                }
            })
            .catch((err) => {
                setError(true);
                location.replace("/");
                console.log("error in find users: ", err);
            });

        fetch(`/friendship-status/${id}`)
            .then((data) => data.json())
            .then(({ data }) => {
                console.log("data in friendship status", data);
                if (data?.accepted) {
                    setFriendship(true);
                }
            })
            .catch((err) => {
                console.log("error in find friendship: ", err);
            });
    }, [id]);

    return (
        <div className="profile-container">
            <p>{error ? "no results found" : ""}</p>
            <div className="bio-container">
                <img
                    className="profile-avatar"
                    src={user.url || "/default.png"}
                    alt="Profile Picture of another User"
                ></img>
                <div className="bio-editor-container">
                    <h2>Bio of {user.first} {user.last}</h2>
                    <p id="bio-editor">{user.bio}</p>
                    <FriendBtn viewedUserId={id} loggedInUserid={userId} />
                </div>
            </div>

            {friendship ? <OtherProfileWall wallId={id} userId={userId} /> : ""}
            {/* OTHER PROFILE WALL if me and the person are friends */}
            {/* <OtherProfileWall wallId={id} userId={userId} /> */}
        </div>
    );
}

// history.pushState("/");
// history.replace("/");
// ich muss an die id von dem picture das geklickt wurde kommen (als props durchgeben?);
// wenn ich auf ein profil klicke, will ich die id haben und die seite zeigen. d.h. ich benötige ein klickevent
