import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            userId: "",
            loggedIn: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Registration Mounted");
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("handle Change Update done:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit", this.state);
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => {
                console.log("Data from handle Submit: ", data);
                return data.json();
            })
            .then((data) => {
                console.log("response data from /register.json", data);

                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in fetch register.json", err);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        return (
            <div id="registration-container">
                <h1>Register</h1>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>
                        {" "}
                        Error, something went wrong{" "}
                    </h2>
                )}
                <form>
                    <input
                        onChange={this.handleChange}
                        name="first"
                        placeholder="First Name"
                        type="text"
                    />
                    <input
                        onChange={this.handleChange}
                        name="last"
                        placeholder="Last Name"
                        type="text"
                    />
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
                    <button onClick={this.handleSubmit}>REGISTER</button>
                </form>
                <Link to="/login">
                    <button id="login-btn">LOGIN</button>
                </Link>
            </div>
        );
    }
}
