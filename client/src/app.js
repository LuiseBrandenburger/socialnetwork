// import { Link } from "react-router-dom";
import { Component } from "react";
import ProfilePic from "./profilePic";
import TitlePic from "./titlePic";

import Uploader from "./uploader";
import Profile from "./profile";
import FindUsers from "./findUsers";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            editBio: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    componentDidMount() {
        console.log("App component mounted");

        fetch("/user")
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    id: data.data.id,
                    first: data.data.first,
                    last: data.data.last,
                    url: data.data.url,
                    bio: data.data.bio,
                });
            });
    }
    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    updateBio(bioDraft) {
        this.setState({
            bio: bioDraft,
        });
    }
    render() {
        return (
            <div id="app-container">
                <BrowserRouter>
                    <section className="navbar-container">
                        <nav className="navbar">
                            <div className="navbar-links">
                                <Link to="/find-users">
                                    <span>Users</span>
                                </Link>
                                <Link to="/">
                                    <span>Profile</span>
                                </Link>
                            </div>
                            <div id="logout">
                                <a href="logout">
                                    <span>Logout</span>
                                </a>
                            </div>
                        </nav>

                        <div id="photo-icon">
                            <svg
                                viewBox="0 0 148 87"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    y="9"
                                    width="148"
                                    height="78"
                                    rx="3"
                                    fill="#5e5e5e"
                                />
                                <circle
                                    cx="73.5"
                                    cy="47.5"
                                    r="31.5"
                                    fill="#e1e1e1d2"
                                />
                                <circle cx="74" cy="48" r="27" fill="#5e5e5e" />
                                <rect
                                    x="116"
                                    width="14"
                                    height="17"
                                    rx="3"
                                    fill="#5e5e5e"
                                />
                            </svg>
                        </div>

                        <div id="app-logo">
                            <svg
                                // width="263"
                                // height="102"
                                viewBox="0 0 263 102"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* <ellipse
                                    cx="131.27"
                                    cy="50.5339"
                                    rx="49.8909"
                                    ry="131.027"
                                    transform="rotate(-90.2814 131.27 50.5339)"
                                    fill="white"
                                /> */}
                                <circle
                                    cx="130.627"
                                    cy="50.6267"
                                    r="50.5"
                                    transform="rotate(179.856 130.627 50.6267)"
                                    fill="#6B6B6B"
                                />
                                <ellipse
                                    cx="131.041"
                                    cy="50.5427"
                                    rx="17"
                                    ry="16.5"
                                    transform="rotate(179.856 131.041 50.5427)"
                                    fill="black"
                                />
                                <ellipse
                                    cx="139.523"
                                    cy="60.0213"
                                    rx="8.5"
                                    ry="9"
                                    transform="rotate(179.856 139.523 60.0213)"
                                    fill="white"
                                />
                                <circle
                                    cx="88.5"
                                    cy="25.5"
                                    r="8.5"
                                    fill="#CFCFCF"
                                />
                            </svg>
                        </div>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            url={this.state.url}
                            toggleUploader={this.toggleUploader}
                            cssClass="navbar-avatar"
                        />
                        <TitlePic
                            first={this.state.first}
                            last={this.state.last}
                            // url={this.state.url}
                            cssClass="navbar-title"
                        />
                    </section>
                    <hr></hr>
                    <div className="content-container">
                        <Route exact path="/">
                            <Profile
                                toggleUploader={this.toggleUploader}
                                updateBio={this.updateBio}
                                editBio={this.editBio}
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                url={this.state.url}
                            />
                        </Route>
                        <Route path="/find-users">
                            <FindUsers />
                        </Route>
                    </div>
                </BrowserRouter>
                <footer>&#169;Luise Brandenburger 2021</footer>
                {this.state.uploaderIsVisible && (
                    <Uploader toggleUploader={this.toggleUploader} />
                )}
            </div>
        );
    }
}
