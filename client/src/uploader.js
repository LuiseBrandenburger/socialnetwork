import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePictureSubmit = this.handlePictureSubmit.bind(this);
    }
    componentDidMount() {
        console.log("uploader component mounted");
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.files[0],
            },
            () => console.log("handle Change Update done:", this.state)
        );
    }
    handlePictureSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.file);

        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log("response data from /upload.json", data[0].url);

                if (data[0].url) {
                    location.reload();
                } else {
                    this.setState({
                        error: true,
                    });
                }
                this.props.toggleUploader();
            })
            .catch((err) => {
                console.log("error in fetch upload.json", err);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        return (
            <div className="uploader-modal">
                <button
                    className="modal-btn"
                    onClick={() => this.props.toggleUploader()}
                >
                    x
                </button>
                <div className="modal-box">
                    <div className="uploader-modal-content-container">
                        {this.state.error && (
                            <h2 style={{ color: "red" }}>
                                {" "}
                                Error, something went wrong{" "}
                            </h2>
                        )}
                        <form className="uploader-form">
                            <label htmlFor="file" className="file-label">
                                <i className="fas fa-cloud-upload-alt"></i>FILE
                                INPUT
                            </label>
                            <input
                                onChange={this.handleChange}
                                type="file"
                                name="file"
                                id="file"
                                accept="image/*"
                            />
                            <button onClick={this.handlePictureSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
