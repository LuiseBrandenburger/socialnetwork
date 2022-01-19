export default function TitlePic({
    first,
    last,
    url,
    // toggleTitlePicUploader,
    cssClass,
}) {
    // url = url || "default.png";

    return (
        <>
            <img
                // onClick={() => toggleTitlePicUploader()}
                src={url || "/roger-dean-26.jpg"}
                alt={`social network profile picture of ${first} ${last}`}
                className={cssClass}
            />
        </>
    );
}
