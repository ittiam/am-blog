'use strict';

exports.index = function* () {
  const mid = 6;
  const meta = yield this.service.meta.find(mid);

  yield this.render('admin.html', meta);
}
