import { Component } from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // console.log("Profile component mounted");
        // console.log("this.props in profile component:", this.props);
    }
    render() {
        return (
            <div className="profile-container">
                <ProfilePic
                    toggleUploader={this.props.toggleUploader}
                    first={this.props.first}
                    last={this.props.last}
                    url={this.props.url}
                    cssClass="profile-avatar"
                />
                <BioEditor
                    bio={this.props.bio}
                    updateBio={this.props.updateBio}
                    editBio={this.props.editBio}
                />
            </div>
        );
    }
}
