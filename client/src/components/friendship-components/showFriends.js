import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsAndWannabees } from "../../redux/friends-and-wannabees/slice.js";

export default function ShowFriends() {
    const dispatch = useDispatch();

    const currentFriends = useSelector(
        (state) =>
            state.friendsAndWannabees &&
            state.friendsAndWannabees.filter(
                (friendsAndWannabees) => friendsAndWannabees.accepted == true
            )
    );
    // console.log("current Friends in Wall: ", currentFriends);

    useEffect(() => {
        fetch(`/friends-and-wannabees`)
            .then((data) => data.json())
            .then(({ data }) => {
                // console.log("data in GET Route friends-and-wannabees: ", data);
                dispatch(receiveFriendsAndWannabees(data));
            })
            .catch((err) => {
                location.replace("/");
                console.log("error in find Friends: ", err);
            });
    }, []);

    return (
        <div className="show-friends">
            <h2>My Friends</h2>
            <div className="wall-friends-container">
                {currentFriends &&
                    currentFriends.map((currentFriend) => (
                        <div className="wall-friends" key={currentFriend.id}>
                            <Link
                                to={`/show-user/${currentFriend.id}`}
                                key={currentFriend.id}
                            >
                                <img
                                    className="wall-friend-avatar"
                                    src={currentFriend.url || "default.png"}
                                    alt={`social network profile picture of ${currentFriend.first} ${currentFriend.last}`}
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
