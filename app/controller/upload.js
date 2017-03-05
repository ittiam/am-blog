const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');
const sendToWormhole = require('stream-wormhole');
const crypto = require('crypto');

var fileKey = {
  // use Qiniu hash as file basename, if set, `safeString` will be ignored
  hashAsBasename: false,
  safeString: true, // use safaString util to rename filename, e.g. Chinese to Pinyin
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

function getFileKey(stream, keyOptions) {
  var fileKey = null;

  if (keyOptions) {
    var getValue = function(obj) {
      return typeof obj === 'function' ? obj() : obj;
    };
    var ext = path.extname(stream.filename);
    var basename = path.basename(stream.filename, ext);
    var prefix = '';
    var suffix = '';
    var extname = '';

    if (keyOptions.prefix) {
      prefix = moment().format(getValue(keyOptions.prefix)).replace(/^\//, '');
    }

    if (keyOptions.suffix) {
      suffix = getValue(keyOptions.suffix)
    }

    if (keyOptions.extname !== false) {
      extname = ext.toLowerCase();
    }

    var contactKey = function(name) {
      return prefix + name + suffix + extname;
    };

    if (keyOptions.hashAsBasename) {
      return getHash(stream).then(function(hash) {
        return contactKey(hash);
      });
    } else if (keyOptions.safeString) {
      basename = utils.safeString(basename);
    }

    fileKey = contactKey(basename);
  }

  return Promise.resolve(fileKey);
}
