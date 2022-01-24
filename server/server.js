const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

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

// app.post("/message", (req, res) => {
//     io.sockets.sockets.get(socketId).broadcast.emit("asdf");
//     io.emit("");
// });

// io.on("connection", (socket) => {
//     console.log("New Socket Conenction", socket.id);

//     socket.on("client-to-server-onion", (message) => {
//         console.log(message);
//     });

//     // sends message to client console
//     socket.emit("hello", "Taderitadera");
// });

io.on("connection", (socket) => {
    // console.log("New Socket Conenction", socket.id);
    const userId = socket.request.session.userId;
    console.log(
        `user with the ${socket.id} and the UserId: ${userId} connected`
    );

    // if (!socket.request.session.userId) {
    //     return socket.disconnect(true);
    // }

    // // here we want to get the past 10 messages that where send.
    // // new table with messages chat_messages , id, user_id, message, created_at
    // // query join damit wir auch die Namen der user erhalten, die letzten 10 und ordered

    // // getLastTenChatMessages(){
    // //     .then(({rows})=> {
    // //         console.log("rows", rows)

    // //         // socket.emit is only going to emmit to the current user
    // //         socket.emit("test", {
    // //             info: ["this is very important message", "new test"]
    // //         })

    // //     })
    // //     .catch()
    // // }

    // socket.on("test", (message) => {
    //     console.log(message);
    // });

    // socket.emit("test", "hello");

    // socket.on("newChatMessage", "Hellööö from the server");
});

// ************************* ANY ROUTS ABOVE ******************************

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
