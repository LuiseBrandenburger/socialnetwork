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
    let viewedUserWallId = 0;

    // console.log("this is the socket: ",socket);

    console.log(
        `user with the ${socket.id} and the UserId: ${userId} connected`
    );
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    // socket.emit("hello", "Hello i am emitted from the server");

    getLastTenChatMessages()
        .then(({ rows }) => {
            console.log("rows fomr getLastTenChatMessages: ", rows);
            rows.forEach((row) => {
                let dateAddedComment = moment(row.created_at).fromNow();
                row.dateAddedComment = dateAddedComment;
            });
            // console.log("rows fomr getLastTenChatMessages: ", rows);
            socket.emit("chatMessages", rows);
        })
        .catch((err) => {
            console.log("err getting last 10 messages: ", err);
        });

    socket.on("newChatMessage", (message) => {
        // console.log("message: ", message);
        // add message to DB

        Promise.all([addUserMessage(message, userId), getUserChatById(userId)])
            .then((results) => {
                // console.log("values from DB: ", results[0].rows[0]);
                // console.log("values from DB: ", results[1].rows[0]));

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
            // console.log("rows fomr getLastTenWallMessages: ", rows);
            rows.forEach((row) => {
                let dateAddedComment = moment(row.created_at).fromNow();
                row.dateAddedComment = dateAddedComment;
            });
            // console.log("rows fomr getLastTenWallMessages: ", rows);
            socket.emit("wallMessages", rows);
        })
        .catch((err) => {
            console.log("err getting last 10 messages: ", err);
        });

    socket.on("newWallMessage", (message) => {
        console.log("message: ", message);
        //     // add message to DB

        Promise.all([
            // ich muss an die authorId kommen! addWallMessage(message, wallId, authorId)
            addWallMessage(message, userId, userId),
            getUserChatById(userId),
        ])
            .then((results) => {
                // console.log("values from DB: ", results[0].rows[0]);
                // console.log("values from DB: ", results[1].rows[0]);

                const newWallMessageBuild = [
                    {
                        // TODO: AUTHOR einfügen
                        id: results[1].rows[0].id,
                        first: results[1].rows[0].first,
                        last: results[1].rows[0].last,
                        url: results[1].rows[0].url,
                        wallmessage: results[0].rows[0].wall_message,
                        wallmessageid: results[0].rows[0].messageid,
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
        console.log("wall Id emitted from viewed user Wall: ", wallId);
        viewedUserWallId = wallId;

        getLastTenWallMessages(wallId)
            .then(({ rows }) => {
                console.log("rows from viewedWallId: ", rows);
                rows.forEach((row) => {
                    let dateAddedComment = moment(row.created_at).fromNow();
                    row.dateAddedComment = dateAddedComment;
                });
                console.log(
                    "rows from viewedWallId: ",
                    rows
                );
                // socket.emit("wallMessages", rows);
            })
            .catch((err) => {
                console.log("err getting last 10 messages: ", err);
            });
    });

    console.log("viewedUserWallId", viewedUserWallId);
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
