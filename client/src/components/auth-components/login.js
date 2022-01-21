import { Link } from "react-router-dom";
import { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userId: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        console.log("Login Mounted");
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("handle Change Update done:", this.state);
                this.setState({
                    error: false,
                });
            }
        );
    }
    handleLogin(e) {
        e.preventDefault();
        console.log("user wants to submit", this.state);

        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => {
                console.log("Data from handle Login: ", data);
                return data.json();
            })
            .then((data) => {
                console.log("response data from /login.json", data);
                if (data.success) {
                    location.replace("/");
                    // location.reload();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in fetch login.json", err);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        return (
            <div id="login-container">
                <Link to="/">
                    <button id="go-back-btn">GO BACK</button>
                </Link>
                <h1>You can login here: </h1>
                {this.state.error && (
                    <h3 style={{ color: "red" }}>
                        {" "}
                        Error, something went wrong{" "}
                    </h3>
                )}
                <form>
                    <input
                        onChange={this.handleChange}
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                    />
                    <input
                        onChange={this.handleChange}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <button onClick={this.handleLogin}>LOGIN</button>
                </form>
                <Link to="/reset">
                    <button id="reset-btn">RESET PASSWORD</button>
                </Link>
            </div>
        );
    }
}
