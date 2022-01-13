export default function ProfilePic({ first, last, url, toggleUploader, cssClass }) {

    url = url || "default.png";

    return (
        <>
            <img
                onClick={() => toggleUploader()}
                src={url}
                alt={`social network profile picture of ${first} ${last}`}
                className={cssClass}
            />
        </>
    );
}