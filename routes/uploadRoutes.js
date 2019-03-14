const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
  accessKeyId: 'youraccesskeyid',
  secretAccessKey: 'yoursecretaccesskeyid'
});

//myuserid/jdlajdlsakjdlkas.jpeg

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl('putObject', {
      Bucket: 'yourBucketName',
      ContentType: 'image/jpeg',
      key
    },(err, url) => res.send({ key, url }));
  });
};