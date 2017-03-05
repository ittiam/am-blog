const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

module.exports = function* () {
  const stream = yield this.getFileStream();
  let filepath = path.join(this.app.config.baseDir, `logs/${stream.filename}`);

  this.logger.warn('Saving %s to %s', stream.filename, filepath);
  try {
    yield saveStream(stream, filepath);
  } catch (err) {
    yield sendToWormhole(stream);
    throw err;
  }

  this.body = {
    file: stream.filename,
    fields: stream.fields,
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
