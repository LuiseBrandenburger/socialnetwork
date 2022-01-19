const express = require("express");
const friendship = express.Router();

const {
    getFriendship,
    postFriendship,
    acceptFriendship,
    deleteFriendship,
} = require("../sql/db");

/*************************** ROUTES ***************************/

friendship.get("/friendship-status/:id", function (req, res) {

    getFriendship(req.params.id, req.session.userId)
        .then(({ rows }) => {
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

    if (data.btnText === "Add User") {
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
