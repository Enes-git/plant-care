const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
	secrets = process.env; // in prod the secrets are environment variables
} else {
	secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
	accessKeyId: secrets.AWS_KEY,
	secretAccessKey: secrets.AWS_SECRET,
	region: "eu-west-1",
});

exports.sendEmail = (recipient, code) =>
	ses
		.sendEmail({
			Source: "Kaput Maize <kaput.maize@spicedling.email>",
			Destination: {
				ToAddresses: [recipient],
			},
			Message: {
				Body: {
					Text: {
						Data: `You have requested the following reset code. \n ${code}.`,
					},
				},
				Subject: {
					Data: "RESET PASSWORD",
				},
			},
		})
		.promise()
		.then(() => console.log("SES email sent"))
		.catch((err) => console.log("Err in SES", err));
