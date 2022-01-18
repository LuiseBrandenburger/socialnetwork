const express = require("express");
const friendship = express.Router();

const {
    getFriendship,
    postFriendship,
    updateFriendship,
} = require("../sql/db");
const { hash } = require("../bc");
// const helpers = require("./utils/helpers");

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
    // console.log("ID in Params: ", req.params.id);
    // console.log("ID in Session Id: ", req.session.userId);

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
        let accepted = false;
        postFriendship(req.session.userId, data.viewedId, accepted)
            .then(({ rows }) => {
                // console.log("rows after user has been fetched: ", rows);
                res.json({
                    data: rows[0],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (data.btnText === "Pending | Cancel Request") {
        // cancel the friend request
        console.log("the button has a diffrent status", data);

    }
});


/*************************** EXPORT ***************************/

module.exports = friendship;
