// import { Link } from "react-router-dom";
import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";

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
                <nav className="navbar">
                    <img
                        src="/logo.png"
                        alt="social network logo"
                        id="app-logo"
                    />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        toggleUploader={this.toggleUploader}
                        cssClass="navbar-avatar"
                    />
                </nav>
                <h1>
                    Welcome back, {this.state.first} {this.state.last}
                </h1>

                <Profile
                    toggleUploader={this.toggleUploader}
                    updateBio={this.updateBio}
                    editBio={this.editBio}
                    first={this.state.first}
                    last={this.state.last}
                    bio={this.state.bio}
                    url={this.state.url}
                />

                <form action="/logout">
                    <button>Logout</button>
                </form>
                {this.state.uploaderIsVisible && (
                    <Uploader toggleUploader={this.toggleUploader} />
                )}
            </div>
        );
    }
}
