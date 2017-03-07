'use strict';

const fs = require('fs');
const path = require('path');

module.exports = app => {
  class SiteServer extends app.Service {
    * init() {
      try {
        fs.writeFileSync(path.join(this.app.config.baseDir, 'install.lock'), '');
        this.app.INSTALL = true;
      } catch (err) {
        throw new Error('初始化站点失败');
      }
    }
  }

  return SiteServer;
};
