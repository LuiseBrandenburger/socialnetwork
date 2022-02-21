import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editBio: false,
            bioDraft: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveBio = this.saveBio.bind(this);
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }
    componentDidMount() {}
    toggleEditBio() {
        this.setState({ editBio: !this.state.editBio });
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("handle Change Update done:", this.state)
        );
    }
    saveBio(e) {
        e.preventDefault();
        this.setState({
            bioDraft: this.state.bioDraft,
        });

        fetch("/bio.json", {
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

                if (data[0].bio) {
                    this.props.updateBio(data[0].bio);
                    this.toggleEditBio();
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("error in fetch bio.json", err);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        if (this.state.editBio) {
            return (
                <div className="bio-editor-container">
                    <h2>Bio</h2>
                    <textarea
                        name="bioDraft"
                        id="bio-editor"
                        defaultValue={this.props.bio}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.saveBio}>Save Changes</button>
                </div>
            );
        } else {
            return (
                <div className="bio-editor-container">
                    <h2>Bio</h2>
                    <p id="bio-editor">{this.props.bio}</p>
                    <button onClick={this.toggleEditBio}>
                        {this.props.bio ? "Edit" : "Add"}
                    </button>
                </div>
            );
        }
    }
}
