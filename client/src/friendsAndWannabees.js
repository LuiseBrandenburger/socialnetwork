// import {useDispatch, useSelector}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeFriend } from "./redux/friends-and-wannabees/slice.js";

export default function FriendsAndWannabees({ userId }) {


    const dispatch = useDispatch();

    // const friendsAndWannabees = useSelector(
    //     (state) =>
    //         state.friendsAndWannabees &&
    // state.friendsAndWannabees.filter((friendsAndWannabees) => //TODO: alle (nicht nur die mit einem bestimmten status) friendsAndWannabees.accepted == true)
    // );

    // const currentFriends = useSelector(
    //     (state) =>
    //         state.friendsAndWannabees &&
    // state.friendsAndWannabees.filter((friendsAndWannabees) => friendsAndWannabees.accepted == true)
    // );

    // const friendWannabees = useSelector(
    //     (state) =>
    //         state.friendsAndWannabees &&
    // state.friendsAndWannabees.filter((friendsAndWannabees) => friendsAndWannabees.accepted == false)
    // );

    // const characters = {...hotCharacters, notCharacters};

    useEffect(() => {
        // console.log("Characters:", characters);
        // if (!characters) {
        //     (async () => {
        //         const { data } = await axios.get("/characters");
        //         dispatch(receiveCharacters(data.characters));
        //     })();
        // }

        console.log("my ID:", userId);

        fetch(`/friends-and-wannabees`)
            .then((data) => data.json())
            .then((data) => {
                console.log("data in GET Route friends-and-wannabees: ", data.data);
                //         dispatch(receiveFriendsAndWannabees(data));
            })
            .catch((err) => {
                location.replace("/");
                console.log("error in find Friends: ", err);
            });
    }, []);

    // if (!characters) {
    //     return null;
    // }

    const handleAcceptClick = (idClickedUser) => {
        console.log("handleAcceptClick has been clicked! id:", idClickedUser);

        // fetch(`/friends-and-wannabees/accept/${id}`, {
        //     method: "POST",
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("data in f&w/accept", data);
        //         if (data.success) {
        //             const action = makeFriend(id);
        //             dispatch(action);
        //         }
        //     });
    };

    // const handleNotClick = (id) => {
    //     // console.log("hot has been clicked! id:", id);

    //     fetch(`/not/${id}`, {
    //         method: "POST",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("data in not", data);
    //             if (data.success) {
    //                 const action = madeCharacterNot(id);
    //                 dispatch(action);
    //             }
    //         });
    // };

    return (
        // FIXME: Id weitergeben für den fall ich benötige es in einem anderen Component? oder über Store??

        <div id="friends-and-wannabees-container">
            <h1>Hello from Friends and Wannabees</h1>

            <h2>Friend Wannabees</h2>

            <div className="user-display-container">
                {/* <Link to={`/show-user/`} key={}> */}
                <div className="user-box">
                    <h2 id="user-name">Name of User 1</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button onClick={() => handleAcceptClick(userId)}>
                        Accept Friendship
                    </button>
                </div>
                {/* </Link> */}
                <div className="user-box">
                    <h2 id="user-name">Name of User 2</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Accept Friendship</button>
                </div>
                <div className="user-box">
                    <h2 id="user-name">Name of User 3</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Accept Friendship</button>
                </div>
                <div className="user-box">
                    <h2 id="user-name">Name of User 4</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Accept Friendship</button>
                </div>

                {/* {users &&
                    users.map((user) => (
                        <Link to={`/show-user/${user.id}`} key={user.id}>
                            <div className="user-box" key={user.id}>
                                <h2 id="user-name" key={user.id}>
                                    {user.first}
                                </h2>
                                <img
                                    src={user.url || "default.png"}
                                    alt={`social network profile picture of ${user.first} ${user.last}`}
                                />
                            </div>
                        </Link>
                    ))} */}
            </div>

            <h2>Current Friends</h2>

            <div className="user-display-container">
                <div className="user-box">
                    <h2 id="user-name">Name of User 1</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Delete Friendship</button>
                </div>
                <div className="user-box">
                    <h2 id="user-name">Name of User 2</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Delete Friendship</button>
                </div>
                <div className="user-box">
                    <h2 id="user-name">Name of User 3</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Delete Friendship</button>
                </div>
                <div className="user-box">
                    <h2 id="user-name">Name of User 4</h2>
                    <img
                        src="/default.png"
                        alt={`social network profile picture`}
                    />
                    <button>Delete Friendship</button>
                </div>

                {/* {users &&
                    users.map((user) => (
                        <Link to={`/show-user/${user.id}`} key={user.id}>
                            <div className="user-box" key={user.id}>
                                <h2 id="user-name" key={user.id}>
                                    {user.first}
                                </h2>
                                <img
                                    src={user.url || "default.png"}
                                    alt={`social network profile picture of ${user.first} ${user.last}`}
                                />
                            </div>
                        </Link>
                    ))} */}
            </div>
        </div>
    );
}
