const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');
const qn = require('qn');

// var client = qn.create(this.options);

var fileKey = {
  // use Qiniu hash as file basename, if set, `safeString` will be ignored
  hashAsBasename: false,
  prefix: 'YYYY/MM/', // {String | Function} will be formated by moment.js, using `[]` to escape,
  suffix: '', // {String | Function} string added before file extname.
  extname: true // keep file's extname
};

exports.local = function* () {
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
}

exports.qiniu = function* () {

};

function saveQnStream(stream) {
  return new Promise(function(resolve, reject) {
    getFileKey(file).then((function(key) {
      client.upload(stream, {
        key: key
      }, function(err, result) {
        err ? reject(err) : resolve(result.url);
      });
    }));
  });
}


function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filepath);
    stream.pipe(ws);
    ws.on('error', reject);
    ws.on('finish', resolve);
  });
}

// sha1 算法
function sha1 (content) {
  return crypto.createHash('sha1').update(content).digest();
}

function getHash (stream) {
  // 以 4M 为单位分割
  var blockSize = 4 * 1024 * 1024;
  var sha1String = [];
  var prefix = 0x16;
  var blockCount = 0;

  function calcHash() {
    if (!sha1String.length) {
      return 'Fto5o-5ea0sNMlW_75VgGJCv2AcJ';
    }
    var sha1Buffer = Buffer.concat(sha1String, blockCount * 20);

    // 如果大于4M，则对各个块的 sha1 结果再次 sha1
    if (blockCount > 1) {
      prefix = 0x96;
      sha1Buffer = sha1(sha1Buffer);
    }

    sha1Buffer = Buffer.concat(
      [new Buffer([prefix]), sha1Buffer],
      sha1Buffer.length + 1
    );

    return sha1Buffer
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-');
  }

  stream.on('readable', function() {
    var chunk;
    while (chunk = stream.read(blockSize)) {
      sha1String.push(sha1(chunk));
      blockCount++;
    }
  });

  return new Promise(function(resove, reject) {
    stream.on('end', function() {
      resove(calcHash());
    });
  });
}

function getFileKey(stream, options) {
  var keyOptions = Object.assign({
    hashAsBasename: false,
    prefix: 'YYYY/MM/',
    suffix: '',
    extname: true
  }, options);

  var getValue = function(obj) {
    return typeof obj === 'function' ? obj() : obj;
  };

  var ext = path.extname(stream.filename);
  var basename = path.basename(stream.filename, ext);
  var prefix = '';
  var extname = '';

  if (keyOptions.prefix) {
    prefix = moment().format(getValue(keyOptions.prefix)).replace(/^\//, '');
  }

  if (keyOptions.extname) {
    extname = ext.toLowerCase();
  }

  var contactKey = function(name) {
    return prefix + name + keyOptions.suffix + ext.toLowerCase();
  };

  if (keyOptions.hashAsBasename) {
    return getHash(stream).then(function(hash) {
      return contactKey(hash);
    });
  }

  return Promise.resolve(contactKey(basename));
}
