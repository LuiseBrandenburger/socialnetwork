import ReactDOM from "react-dom";
import Welcome from "./welcome";
import WelcomeLoggedIn from "./welcomeLoggedIn";


// ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<WelcomeLoggedIn />, document.querySelector("main"));

            // ReactDOM.render(
            //     <img src="/logo.gif" alt="logo" />,
            //     document.querySelector("main")
            // );
        }
    });
