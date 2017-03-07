'use strict';

const moment = require('moment');
const marked = require('marked');

// 官网首页
exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  yield this.render('index.html', {
    pageNum,
    pageSize,
  });
};
