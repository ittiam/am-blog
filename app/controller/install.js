'use strict';

const fs = require('fs');
const path = require('path');

const installRule = {
  name: {
    type: 'string',
  },
  email: {
    required: false,
    allowEmpty: true,
    type: 'email',
  },
  password: {
    type: 'password',
  },
  title: {
    type: 'string',
  },
  url: {
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
  const errors = this.validator.validate(installRule);

  this.service.site.init();
};
