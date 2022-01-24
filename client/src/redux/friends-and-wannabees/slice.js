

export function friendsAndWannabeesReducer(friendsAndWannabees = null, action) {
    if (action.type == "friends-and-wannabees/receivedFriendsAndWannabees") {
        // console.log("action in slice", action);
        friendsAndWannabees = action.payload.friendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/accept") {
        const newFriendsAndWannabees = friendsAndWannabees.map(
            (friendsAndWannabee) => {
                if (friendsAndWannabee.id === action.payload.id) {
                    return {
                        ...friendsAndWannabee,
                        accepted: true,
                    };
                }
                return friendsAndWannabee;
            }
        );
        console.log("newFriendsAndWannabees:", newFriendsAndWannabees);
        return newFriendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/end") {
        friendsAndWannabees = friendsAndWannabees.filter(
            (friendsAndWannabee) => friendsAndWannabee.id !== action.payload.id
        );
    }
    // console.log("new friendsAndWannabees:", friendsAndWannabees);
    return friendsAndWannabees;
}

// ********************* ACTIONS ***********************

export function receiveFriendsAndWannabees(friendsAndWannabees) {
    // console.log("friends and wannabees in reducer: ", friendsAndWannabees);
    return {
        type: "friends-and-wannabees/receivedFriendsAndWannabees",
        payload: { friendsAndWannabees },
    };
}

/*
Actions are plain Javascript objects that represent any occurrence that should result in a change in your application's state. These objects need to have a type property that describes the occurrence they represent (while this can be any string, a common convention is to use the format "domain/thingThatHappened"). Actions will often have an additional payload property containing information relevant to the occurrence.
 */

export function acceptFriendship(id) {
    console.log("acceptFriendship in reducer: ", id);

    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function endFriendship(id) {
    console.log("endFriendship in reducer: ", id);

    return {
        type: "friends-and-wannabees/end",
        payload: { id },
    };
}


/*
The redux-thunk middleware solves this issue by allowing you to dispatch functions (instead of action objects). Those functions, also fancifully called thunks, will be passed the dispatch method, they can then perform asynchronous tasks before dispatching an action. For instance this thunk action creator will asynchronously fetch a list of users and dispatch them to the store once they are available.

https://www.youtube.com/watch?v=lmyKHYmgUYc

*/

// export function acceptFriendshipAsync(id) {
//     return async (dispatch) => {
//         const data = await fetch("/users").then((response) => response.json());
//         dispatch({
//             type: "users/receivedUsers",
//             payload: {
//                 users: data.users,
//             },
//         });
//     };
// }