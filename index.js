const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const config = require('./config');
const file = process.argv[2];
const fileName = path.basename(file);


const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : config.accessKey,
        secretAccessKey: config.secretKey
    }
});


const bucketName = config.bucket;
const folderName = config.folder;

(async () => {
    // create folder
    await S3.putObject({
        Bucket: bucketName,
        Key: folderName
    }).promise();

    // upload file
    await S3.putObject({
        Bucket: bucketName,
        Key: fileName,
        ACL: 'public-read',
        // ACL을 지우면 전체공개가 되지 않습니다.
        Body: fs.createReadStream(file)
    }).promise();

})();
