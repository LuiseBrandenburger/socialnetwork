export default function TitlePic({
    first,
    last,
    url,
    // toggleTitlePicUploader,
    cssClass,
}) {

    return (
        <>
            <img
                // onClick={() => toggleTitlePicUploader()}
                src={url || "/title5.png"}
                alt={`social network profile picture of ${first} ${last}`}
                className={cssClass}
            />
        </>
    );
}
