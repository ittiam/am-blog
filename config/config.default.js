'use strict';

exports.keys = 'my secret keys';

exports.view = {
  defaultViewEngine: 'nunjucks',
};

exports.nunjucks = {
  // dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
  // cache: true,                  // local env is false
};

exports.security = {
  csrf: false
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

exports.onerror = {
  errorPageUrl: '/500',
};
