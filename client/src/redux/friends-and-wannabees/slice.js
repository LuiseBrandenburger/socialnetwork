export function friendsAndWannabeesReducer(friendsAndWannabees = null, action){
    if (action.type == "friends-and-wannabees/receivedFriendsAndWannabees") {
        friendsAndWannabees = action.payload.friendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/accept") {
        // const newFriendsAndWannabees = friendsAndWannabees.map((friendsAndWannabee) => {
        //     if (friendsAndWannabees.id === action.payload.id) {
        //         return {
        //             ...friendsAndWannabees,
        //             accepted: true,
        //         };
        //     }
        //     return friendsAndWannabees;
        // });
        // return newFriendsAndWannabees;
    } else if (action.type === "friends-and-wannabees/end") {
        // wenn der action type aufgerufen wird, mache das mit den Daten:
        // const newFriendsAndWannabees = friendsAndWannabees.map((friendsAndWannabee) => {
        //     if (friendsAndWannabees.id === action.payload.id) {
        //         return {
        //             ...friendsAndWannabees,
        //             accepted: false,
        //         };
        //     }
        //     return friendsAndWannabees;
        // });
        // return newFriendsAndWannabees;
    }

    // TODO: INFO: das return Characters ist das geupdatete State Object.
    return friendsAndWannabees;
}


/* TODO: State Object should look like this:

{
    friendships: [
        {
            id: 1,
            first: 'Funky',
            last: 'Chicken',
            image: '/images/default.jpg',
            accepted: false
        },
        {
            id: 2,
            first: 'Disco',
            last: 'Duck',
            image: '/images/default.jpg',
            accepted: true
        }
    ]
}

*/


// ********************* ACTIONS ***********************

// received
// acceptFriendship
// endFriendship
// reject Request (Bonus)


export function receiveFriendsAndWannabees(friendsAndWannabees) {
    return {
        type: "friends-and-wannabees/receivedFriendsAndWannabees",
        payload: { friendsAndWannabees },
    };
}

/**
Actions are plain Javascript objects that represent any occurrence that should result in a change in your application's state. These objects need to have a type property that describes the occurrence they represent (while this can be any string, a common convention is to use the format "domain/thingThatHappened"). Actions will often have an additional payload property containing information relevant to the occurrence.
 */

export function makeAccept(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function endFriendship(id) {
    return {
        type: "friends-and-wannabees/end",
        payload: { id },
    };
}