// Author -
// Jaskaran Singh
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretAccessKey,
});

AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3();

module.exports = {
  s3,
};
