// import { Link } from "react-router-dom";
import { Component } from "react";
import ProfilePic from "./profilePic";
import TitlePic from "./titlePic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import FriendsAndWannabees from "./friendsAndWannabees";


import FindUsers from "./findUsers";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            editBio: false,
            photoIcon: "/photo-icon.svg",
            appLogo: "/app-logo.svg"
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    componentDidMount() {
      
        // console.log("userId aus cookie route:", this.props.userId);

        fetch("/user")
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    // id: data.data.id,
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
                                <Link to="/friends">
                                    <span>Friends</span>
                                </Link>
                            </div>
                            <div id="logout">
                                <a href="/logout">
                                    <span>Logout</span>
                                </a>
                            </div>
                        </nav>

                        <img
                            id="photo-icon"
                            src={this.state.photoIcon}
                            alt="photo icon"
                        ></img>

                        <div id="app-logo"></div>
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
                        <Route path="/show-user/:id">
                            <OtherProfile userId={this.props.userId} />
                        </Route>
                        <Route path="/friends">
                            <FriendsAndWannabees userId={this.props.userId} />
                        </Route>
                    </div>
                </BrowserRouter>
                {this.state.uploaderIsVisible && (
                    <Uploader toggleUploader={this.toggleUploader} />
                )}
                {/* <footer>&#169;Luise Brandenburger 2021</footer> */}
            </div>
        );
    }
}
