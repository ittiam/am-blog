'use strict';

exports.keys = 'amblog';

exports.view = {
  defaultViewEngine: 'nunjucks',
};

exports.nunjucks = {
  // dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
  // cache: true,                  // local env is false
};

exports.userrole = {
  failureHandler(action) {
    switch (action) {
      case 'admin':
        this.status = 403;
        this.redirect('/login');
        break;
      default:
        break;
    }
  },
};

exports.storage = {
  active: 'localStore',
  localStore: {
    destPath: 'app/public/upload'
  },
  qnStore: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://xx.xx.xx.glb.clouddn.com',
    // timeout: 3600000, // default rpc timeout: one hour, optional
    // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
    // uploadURL: 'http://up.qiniu.com/'
  },
};

exports.localStore = {
  destPath: 'app/public/upload',
};

exports.TYPES = {
  TAG: 'tag',
  CATEGORY: 'category',
  ARTICLE: 'post',
  PUBLISH: 'publish',
  PAGE: 'page',
  DRAFT: 'draft',
  LINK: 'link',
};

exports.GROUP = {
  ADMINISTRATOR: 'administrator',
  EDITOR: 'editor',
  CONTRIBUTOR: 'contributor',
  SUBSCRIBER: 'subscriber',
  VISITOR: 'visitor',
};

exports.onerror = {
  errorPageUrl: '/500',
};
