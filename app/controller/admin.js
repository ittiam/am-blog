'use strict';

exports.manager = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  yield this.render('admin/index.html', {
    pageNum,
    pageSize,
    login: this.session.login,
  });
};
