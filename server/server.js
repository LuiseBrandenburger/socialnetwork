const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const moment = require("moment");

const {
    getLastTenChatMessages,
    addUserMessage,
    getUserChatById,
    getLastTenWallMessages,
    addWallMessage,
} = require("./sql/db");

// SOCKETS
const http = require("http");
const SocketIOServer = require("socket.io");
const server = http.createServer(app);
const io = SocketIOServer(server, {
    allowRequest: (req, callback) => {
        callback(null, req.headers.referer.startsWith("http://localhost:3000"));
    },
});

/*************************** REQUIRE ROUTERS ***************************/

const auth = require("./routers/auth-router");
const register = require("./routers/register");
const passwordReset = require("./routers/password-reset");
const user = require("./routers/user-router");
const friendship = require("./routers/friendship-router");

/*************************** SECRET ***************************/

let secret =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;
let socketSecret =
    process.env.COOKIE_SECRET || require("./secrets.json").SOCKET_COOKIE_SECRET;

/*************************** MIDDLEWARE ***************************/

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: socketSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.json());

/*************************** ROUTERS ***************************/

app.use(auth);
app.use(register);
app.use(passwordReset);
app.use(user);
app.use(friendship);

// ************************* SOCKET ******************************

io.on("connection", (socket) => {
    const userId = socket.request.session.userId;

    // console.log(
    //     `user with the ${socket.id} and the UserId: ${userId} connected`
    // );
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    getLastTenChatMessages()
        .then(({ rows }) => {
            rows.forEach((row) => {
                let dateAddedComment = moment(row.created_at).fromNow();
                row.dateAddedComment = dateAddedComment;
            });
            socket.emit("chatMessages", rows);
        })
        .catch((err) => {
            console.log("err getting last 10 messages: ", err);
        });

    socket.on("newChatMessage", (message) => {

        Promise.all([addUserMessage(message, userId), getUserChatById(userId)])
            .then((results) => {
                const newMessageBuild = [
                    {
                        id: results[1].rows[0].id,
                        first: results[1].rows[0].first,
                        last: results[1].rows[0].last,
                        url: results[1].rows[0].url,
                        message: results[0].rows[0].message,
                        messageid: results[0].rows[0].messageid,
                        created_at: results[0].rows[0].created_at,
                        dateAddedComment: moment(
                            results[0].rows[0].created_at
                        ).fromNow(),
                    },
                ];
                io.emit("chatMessage", newMessageBuild);
            })
            .catch((err) => {
                console.log("err getting new Chat Messages: ", err);
            });
    });

    getLastTenWallMessages(userId)
        .then(({ rows }) => {
            rows.forEach((row) => {
                let dateAddedComment = moment(row.created_at).fromNow();
                row.dateAddedComment = dateAddedComment;
            });
            socket.emit("wallMessages", rows);
        })
        .catch((err) => {
            console.log("err getting last 10 messages: ", err);
        });

    socket.on("newWallMessage", (message) => {
        console.log("message: ", message);

        Promise.all([
            addWallMessage(message, userId, userId),
            getUserChatById(userId),
        ])
            .then((results) => {
                const newWallMessageBuild = [
                    {
                        id: results[1].rows[0].id,
                        first: results[1].rows[0].first,
                        last: results[1].rows[0].last,
                        url: results[1].rows[0].url,
                        wallmessage: results[0].rows[0].wall_message,
                        wallmessageid: results[0].rows[0].messageid,
                        wallid: results[0].rows[0].wallid,
                        created_at: results[0].rows[0].created_at,
                        dateAddedComment: moment(
                            results[0].rows[0].created_at
                        ).fromNow(),
                    },
                ];
                io.emit("wallMessage", newWallMessageBuild);
            })
            .catch((err) => {
                console.log("err getting new Chat Messages: ", err);
            });
    });

    socket.on("wallId", (wallId) => {
        getLastTenWallMessages(wallId)
            .then(({ rows }) => {
                rows.forEach((row) => {
                    let dateAddedComment = moment(row.created_at).fromNow();
                    row.dateAddedComment = dateAddedComment;
                });
                socket.emit("wallMessages", rows);
            })
            .catch((err) => {
                console.log("err getting last 10 messages: ", err);
            });
    });

    socket.on("newfriendWallMessage", (messageObject) => {
        Promise.all([
            addWallMessage(messageObject.message, messageObject.wallId, userId),
            getUserChatById(userId),
        ])
            .then((results) => {
                const newWallMessageBuild = [
                    {
                        id: results[1].rows[0].id,
                        first: results[1].rows[0].first,
                        last: results[1].rows[0].last,
                        url: results[1].rows[0].url,
                        wallmessage: results[0].rows[0].wall_message,
                        wallmessageid: results[0].rows[0].messageid,
                        wallid: results[0].rows[0].wallid,
                        created_at: results[0].rows[0].created_at,
                        dateAddedComment: moment(
                            results[0].rows[0].created_at
                        ).fromNow(),
                    },
                ];
                io.emit("wallMessage", newWallMessageBuild);
            })
            .catch((err) => {
                console.log("err getting new Chat Messages: ", err);
            });
    });
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
