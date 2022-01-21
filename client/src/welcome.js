import Registration from "./components/registration-components/registration";
import Reset from "./components/auth-components/reset";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/auth-components/login";

export default function Welcome() {
    return (
        <div className="uploader-modal" id="welcome-container">
            <h1>Welcome to MyFace</h1>
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
