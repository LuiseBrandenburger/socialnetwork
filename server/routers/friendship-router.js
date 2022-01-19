const express = require("express");
const friendship = express.Router();

const {
    getFriendship,
    postFriendship,
    acceptFriendship,
    deleteFriendship,
} = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("hello from friendship router");

friendship.get("/friendship-status/:id", function (req, res) {

    console.log("params in /friendship-status/:id: ", req.params);

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
    console.log("Request Object: ", data);
    // console.log("ID in Session Id: ", req.session.userId);

    if (data.btnText === "Add User") {
        
        // TODO: checken on false und true richtig in der db ankommen!
        postFriendship(req.session.userId, data.viewedId)
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

        console.log("sessionID and ViewedID:", req.session.userId, data.viewedId);
        
        deleteFriendship(req.session.userId, data.viewedId)
            .then(() => {
                res.json({
                    friendshipDeleted: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (data.btnText === "Accept Request") {
        // console.log("the button has a diffrent status (Accept Request)", data);
        acceptFriendship(req.session.userId, data.viewedId)
            .then(({ rows }) => {

                res.json({
                    data: rows[0],
                    friendshipAccepted: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

/*************************** EXPORT ***************************/

module.exports = friendship;
