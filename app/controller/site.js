'use strict';

const installRule = {
  name: {
    type: 'string',
  },
  email: {
    type: 'email',
  },
  password: {
    type: 'password',
  },
  about: {
    required: false,
    allowEmpty: true,
    type: 'string',
  },
  sub_name: {
    required: false,
    allowEmpty: true,
    type: 'string',
  },
};

exports.contact = function* () {
  yield this.render('contact.html');
};

exports.login = function* () {
  const login = this.session.login;

  if (login) {
    this.redirect('/manager');
  } else {
    yield this.render('admin/login.html');
  }

};

exports.logout = function* () {
  this.session.login = false;

  yield this.render('admin/login.html');

};

exports.about = function* () {
  const site = yield this.service.site.getSite();
  yield this.render('about.html', {
    about: site.length ? site[0].about : '',
  });
};

exports.error = function* () {
  yield this.render('500.html');
};

exports.startInstall = function* () {
  yield this.render('install.html', {
    isInstall: this.isInstall,
  });
};

exports.notFound = function* () {
  this.status = 404;
  yield this.render('404.html');
};

exports.install = function* () {
  this.validate(installRule);

  const name = this.request.body.name;
  const email = this.request.body.email;
  const password = this.request.body.password;
  const about = this.request.body.about;
  const sub_name = this.request.body.sub_name;

  yield this.service.site.insert(name, email, password, about, sub_name);

  this.redirect('/manager');
};
