import { Component } from "react";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleResetPw = this.handleResetPw.bind(this);
        this.renderStage = this.renderStage.bind(this);
        this.handleVerifyPw = this.handleVerifyPw.bind(this);
    }
    renderStage() {
        if (this.state.stage === 1) {
            return (
                <div id="reset-pw">
                    <form>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="your@email.com"
                            type="email"
                        />
                        <button onClick={this.handleResetPw}>Reset Password</button>
                    </form>
                </div>
            );
        } else if (this.state.stage === 2) {
            return (
                <div id="add-new-pw">
                    <form>
                        <input
                            onChange={this.handleChange}
                            name="code"
                            placeholder="code"
                            type="text"
                        />
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder="New password"
                            type="password"
                        />
                        <button onClick={this.handleVerifyPw}>Submit</button>
                    </form>
                </div>
            );
        } else if (this.state.stage === 3) {
            return (
                <div id="added-new-pw">
                    <h1>The Password was successfully reset</h1>
                    <Link to="/login">
                        <button>Click here to login!</button>
                    </Link>
                </div>
            );
        }
    }
    componentDidMount() {
        console.log("Reset Mounted");
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("handle Change Update done:", this.state)
        );
    }

    handleResetPw(e) {
        e.preventDefault();
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.success) {
                    // FIXME: setzte Value auf empty
                    console.log("this.state after email was send resetPW:", this.state);
                    this.setState({ stage: 2 });
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

    handleVerifyPw(e) {
        e.preventDefault();
        console.log("user wants to submit", this.state);
        fetch("/password/reset/verify", {
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
                    this.setState({ stage: 3 });
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
            <div id="reset-container">
                {this.state.error && (
                    <h2 style={{ color: "red" }}>
                        {" "}
                        Error, something went wrong{" "}
                    </h2>
                )}
                {this.renderStage()}
            </div>
        );
    }
}
