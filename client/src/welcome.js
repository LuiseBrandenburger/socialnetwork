import Registration from "./registration";
import Reset from "./reset";

import { BrowserRouter, Route } from "react-router-dom";

import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome-container">
            <h1>Welcome to Mapple</h1>
            <h1>Welcome to MyFace</h1>

            <img src="/logo.png" />
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <Reset />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
