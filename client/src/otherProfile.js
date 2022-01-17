import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";


export default function OtherProfile() {
    // const params = useParams();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);

    // const history = useHistory();

    useEffect(() => {
        console.log("Component Mounted");

        // return () => {
        //     console.log("Component Mounted");
        // }
    }, []);

    useEffect(() => {
        console.log("id in Params: ", id);

        fetch(`/api/user/${id}`)
            .then((data) => data.json())
            .then((data) => {
                // Once the profile data is retrieved, it should be added to state to cause a re-rendering.
            })
            .catch((err) => {
                // setError(true);
                console.log("error in find users: ", err);
            });
        // return () => {
        //     abort = true;
        // };
    }, [id]);


    return (
        <div className="profile-container">
            <div className="bio-container">
                <img
                    className="profile-avatar"
                    src="{this.props.url}"
                    alt="Profile Picture of another User"
                ></img>
                <div className="bio-editor-container">
                    <h2>Bio</h2>
                    <p id="bio-editor">{this.props.bio}</p>
                </div>
            </div>
        </div>
    );
}

// history.pushState("/");
// history.replace("/");
// ich muss an die id von dem picture das geklickt wurde kommen (als props durchgeben?);
// wenn ich auf ein profil klicke, will ich die id haben und die seite zeigen. d.h. ich benötige ein klickevent