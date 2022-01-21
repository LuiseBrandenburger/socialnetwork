import Registration from "./components/registration-components/registration";
import Reset from "./components/auth-components/reset";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/auth-components/login";

import { io } from "socket.io-client";
const socket = io();

// sends message to server console
socket.on("hello", (message) => console.log(message));


export default function Welcome() {
    return (
        <div className="uploader-modal" id="welcome-container">
            <h1>Welcome to MyFace</h1>

{/* SOCKET TRY */}
            <button
                onClick={() => socket.emit("client-to-server-onion", "Hello")}
            >
                Emit
            </button>



            <img id="app-logo-landing-page" src="/logo.svg" />
            <BrowserRouter>
                <div className="welcome-box">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/reset">
                        <Reset />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
