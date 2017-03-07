'use strict';

module.exports = app => {
  const admin = app.role.can('admin');
  const install = app.middlewares.install();

  app.get('/', install, app.controller.index.index);

  app.post('/upload', app.controller.upload.local);

  app.get('/manager', install, admin, app.controller.admin.manager);

  app.post('/login', app.controller.auth.doLogin);
  app.get('/login', install, app.controller.auth.login);
  app.get('/install', install, app.controller.site.install);
  app.post('/install', app.controller.site.doInstall);

  app.get('/500', app.controller.site.error);
  app.get('/*', app.controller.site.notFound);
};
