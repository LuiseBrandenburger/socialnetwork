const aws = require("aws-sdk");
// const { AWS_KEY, AWS_SECRET } = require("./secrets.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; 
} else {
    secrets = require("./secrets");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

module.exports.sendEmail = function(subject, body, recipient){
    return ses.sendEmail({
        Source: "Luise <flashy.toucan@spicedling.email>",
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log(err));
};