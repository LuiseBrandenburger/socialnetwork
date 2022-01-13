const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; 
} else {
    secrets = require("./secrets"); 
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
}); //instance of aws user, allows us to communicate with our S3 Bucket

module.exports.upload = (req, res, next) => {

    // console.log("Reqfile in Upload",req.file);

    if (!req.file) {
        console.log("no file, something went wrong with multer");
        return res.sendStatus(500);
    }

    // if we make it here, there is a file to upload
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("img is in the cloud");
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            // uh oh
            console.log("error uploading img to cloud", err);
            return res.sendStatus(500);
        });
};
