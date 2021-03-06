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
                                <svg
                                    // width="199"
                                    // height="125"
                                    viewBox="0 0 199 125"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        width="191"
                                        height="103"
                                        transform="translate(4 4)"
                                        fill="white"
                                    />
                                    <mask
                                        id="path-1-outside-1_7_22"
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="199"
                                        height="111"
                                        fill="black"
                                    >
                                        <rect
                                            fill="white"
                                            width="199"
                                            height="111"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M147.462 36.9444C147.816 35.4888 148 33.9965 148 32.4765C148 16.7494 128.301 4 104 4C82.0175 4 63.8001 14.4331 60.5246 28.0657C57.0279 25.8884 52.6938 24.6 48 24.6C36.402 24.6 27 32.4666 27 42.1706C27 43.0888 27.0842 43.9906 27.2464 44.8708C12.7622 51.4568 4 60.0435 4 69.4353C4 90.1817 46.7568 107 99.5 107C152.243 107 195 90.1817 195 69.4353C195 55.5654 175.89 43.4512 147.462 36.9444Z"
                                        />
                                    </mask>
                                    <path
                                        d="M147.462 36.9444L143.575 35.9981L142.616 39.9386L146.569 40.8435L147.462 36.9444ZM60.5246 28.0657L58.4104 31.4613L63.1183 34.3926L64.4139 29.0001L60.5246 28.0657ZM27.2464 44.8708L28.9021 48.5121L31.7467 47.2187L31.1802 44.1457L27.2464 44.8708ZM144 32.4765C144 33.6712 143.856 34.8459 143.575 35.9981L151.348 37.8907C151.776 36.1316 152 34.3218 152 32.4765H144ZM104 8C115.494 8 125.715 11.0228 132.939 15.6986C140.204 20.4002 144 26.4225 144 32.4765H152C152 22.8033 145.946 14.5874 137.286 8.98249C128.586 3.35186 116.806 0 104 0V8ZM64.4139 29.0001C65.7077 23.6156 70.0998 18.3819 77.1994 14.4118C84.2483 10.4701 93.6123 8 104 8V0C92.4052 0 81.6692 2.74645 73.2949 7.4294C64.9713 12.084 58.617 18.8832 56.6353 27.1312L64.4139 29.0001ZM48 28.6C51.9664 28.6 55.5649 29.6895 58.4104 31.4613L62.6389 24.6701C58.4909 22.0874 53.4211 20.6 48 20.6V28.6ZM31 42.1706C31 35.3141 37.9135 28.6 48 28.6V20.6C34.8905 20.6 23 29.6191 23 42.1706H31ZM31.1802 44.1457C31.0616 43.5026 31 42.8435 31 42.1706H23C23 43.3341 23.1067 44.4786 23.3127 45.596L31.1802 44.1457ZM8 69.4353C8 66.0734 9.55108 62.523 13.0692 58.8793C16.6055 55.2168 21.9375 51.6789 28.9021 48.5121L25.5908 41.2296C18.0712 44.6487 11.7799 48.6972 7.31405 53.3225C2.83002 57.9666 0 63.4055 0 69.4353H8ZM99.5 103C73.5001 103 50.1442 98.8475 33.4355 92.2752C25.0691 88.9843 18.5696 85.1648 14.2289 81.1281C9.89373 77.0965 8 73.142 8 69.4353H0C0 76.1018 3.45087 82.0295 8.78085 86.9863C14.1053 91.9379 21.5914 96.213 30.5071 99.7199C48.3626 106.743 72.7567 111 99.5 111V103ZM191 69.4353C191 73.142 189.106 77.0965 184.771 81.1281C180.43 85.1648 173.931 88.9843 165.565 92.2752C148.856 98.8475 125.5 103 99.5 103V111C126.243 111 150.637 106.743 168.493 99.7199C177.409 96.213 184.895 91.9379 190.219 86.9863C195.549 82.0295 199 76.1018 199 69.4353H191ZM146.569 40.8435C160.505 44.0332 171.88 48.5419 179.667 53.7529C187.564 59.0386 191 64.4829 191 69.4353H199C199 60.5179 192.88 52.9701 184.116 47.1045C175.24 41.1642 162.847 36.3624 148.354 33.0452L146.569 40.8435Z"
                                        fill="black"
                                        mask="url(#path-1-outside-1_7_22)"
                                    />
                                    <rect
                                        x="65"
                                        y="98"
                                        width="70"
                                        height="17"
                                        fill="white"
                                    />
                                    <path
                                        d="M102.828 46.1716C101.266 44.6095 98.7337 44.6095 97.1716 46.1716L71.7157 71.6274C70.1536 73.1895 70.1536 75.7222 71.7157 77.2843C73.2778 78.8464 75.8105 78.8464 77.3726 77.2843L100 54.6569L122.627 77.2843C124.19 78.8464 126.722 78.8464 128.284 77.2843C129.846 75.7222 129.846 73.1895 128.284 71.6274L102.828 46.1716ZM104 124.027L104 49L96 49L96 124.027L104 124.027Z"
                                        fill="black"
                                    />
                                </svg>
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
