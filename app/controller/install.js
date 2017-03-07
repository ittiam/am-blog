'use strict';

const fs = require('fs');
const path = require('path');

const installRule = {
  admin_user: {
    type: 'string',
  },
  admin_email: {
    type: 'email',
  },
  admin_pwd: {
    type: 'password',
    min: 6,
    max: 14,
  },
  site_title: {
    type: 'string',
  },
  site_url: {
    type: 'string',
  },
};

exports.index = function* () {
  let existInstall = false;
  try {
    fs.statSync(path.join(this.app.config.baseDir, 'install.lock'));
    existInstall = true;
  } catch (err) {
    existInstall = false;
  }

  yield this.render('install', {
    isInstall: existInstall,
  });
};

exports.doInstall = function* () {
  this.validate(installRule);

  let siteUrl = this.request.body.site_url;
  if (siteUrl[siteUrl.length - 1] === '/') {
    siteUrl = siteUrl.substring(0, siteUrl.length - 1);
  }
  if (siteUrl.indexOf('http') !== 0) {
    siteUrl = 'http://' + siteUrl;
  }

  yield this.service.user.insert(this.request.body.admin_user, this.request.body.admin_pwd, this.request.body.admin_email, 'administrator');
  yield this.service.option.insert('site_title', this.request.body.site_title);
  yield this.service.option.insert('site_url', siteUrl);

  yield this.service.site.init();

  this.body = {
    success: 1,
    msg: '安装成功',
  };
};
