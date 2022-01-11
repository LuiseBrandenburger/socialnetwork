import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

export default function Logo() {
    return (
        <>
            <h1>Welcome back, </h1>
            <img src="/logo.png" alt="logo" />
            <BrowserRouter>
                <Link to="/logout">
                    <button>Click here to logout!</button>
                </Link>
            </BrowserRouter>
        </>
    );
}
