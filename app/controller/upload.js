const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const sendToWormhole = require('stream-wormhole');

module.exports = function* () {
  const stream = yield this.getFileStream();
  let destDir = moment(Date.now()).format('YYYY-MM-DD');
  let destPath = path.join(this.app.config.baseDir, 'app/public/upload', destDir);
  let filepath = path.join(destPath, stream.filename);

  fs.mkdirsSync(destPath);

  try {
    yield saveStream(stream, filepath);
  } catch (err) {
    yield sendToWormhole(stream);
    throw err;
  }

  this.body = {
    success: 1,
    message: '上传成功',
    url: '/public/upload/' + destDir + '/' + stream.filename
  };
};


function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filepath);
    stream.pipe(ws);
    ws.on('error', reject);
    ws.on('finish', resolve);
  });
}
