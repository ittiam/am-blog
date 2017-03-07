'use strict';

const fs = require('fs');
const path = require('path');

// 判断是否已经安装博客
module.exports = (options) => {
  return function* install(next) {
    if (this.INSTALL) {
      yield next;
    }

    let existInstall = false;
    try {
      fs.statSync(path.join(this.app.config.baseDir, 'install.lock'));
      existInstall = true;
    } catch (err) {
      existInstall = false;
    }

    if (existInstall) {
      this.INSTALL = true;
    }

    yield next;
  }
};
