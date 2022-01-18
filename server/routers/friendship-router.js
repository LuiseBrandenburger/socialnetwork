const express = require("express");
const friendship = express.Router();

const {
    getFriendship,
    postFriendship,
    updateFriendship,
    deletePendingFriendship,
} = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("hello from friendship router");

/**
A simple way to accomplish this would be to create a table for friend requests that has columns for the id of the sender, the id of the recipient, and a boolean indicating whether or not the request has been accepted. 
 
 TODO: When one user sends another a friend request, a row would be inserted with the ids of the sender and receiver in the appropriate columns and the boolean set to false.
 -> POST Route

 TODO: When a user accepts a friend request, the appropriate row would be updated to set the boolean to true.

 TODO: When a user unfriends or cancels a pending request, the row for the request can be deleted (deleting these rows means that we will lose potentially valuable historical information, but that is probably acceptable for our purposes).

 *********************************************************************************
    Is there an existing friend request between a given pair of users?
    If there is a request, has it been accepted?
    If there is a request and it has not been accepted, who is the sender and who is the receiver?

 */

friendship.get("/friendship-status/:id", function (req, res) {

    getFriendship(req.params.id, req.session.userId)
        .then(({ rows }) => {
            // console.log("rows after user has been fetched: ", rows);
            res.json({
                data: rows[0],
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

friendship.post("/api/friendship", function (req, res) {
    const data = req.body;
    // console.log("Request Object: ", data);
    // console.log("ID in Session Id: ", req.session.userId);

    if (data.btnText === "Add User") {
        
        // TODO: checken on false und true richtig in der db ankommen!
        postFriendship(req.session.userId, data.viewedId, false)
            .then(({ rows }) => {
                res.json({
                    data: rows[0],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (
        data.btnText === "Pending | Cancel Request" ||
        data.btnText === "End Friendship"
    ) {
        console.log(
            "the button has a diffrent status (Pending | Cancel Request)",
            data
        );

        deletePendingFriendship(req.session.userId, data.viewedId)
            .then(() => {
                res.json({
                    friendshipDeleted: true,
                    // accepted: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (data.btnText === "Accept Request") {
        console.log("the button has a diffrent status (Accept Request)", data);
        updateFriendship(req.session.userId, data.viewedId, true)
            .then(({rows}) => {
                res.json({
                    data: rows[0],
                    friendshipAccepted: true,
                    // accepted: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

/*************************** EXPORT ***************************/

module.exports = friendship;
