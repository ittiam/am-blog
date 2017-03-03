'use strict';

module.exports = app => {
  app.get('/admin', 'admin.index');
};
