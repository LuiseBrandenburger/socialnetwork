// import { Link } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

export default function Logo() {
    return (
        <div id="welcome-back-container">
            <h1>Welcome back, </h1>
            <img src="/logo.png" alt="logo" />
            <form action="/logout">
                <button>Click here to logout!</button>
            </form>
            {/* <BrowserRouter>
                <Link to="/logout">
                    <button>Click here to logout!</button>
                </Link>
            </BrowserRouter> */}
        </div>
    );
}
