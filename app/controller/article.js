'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };

  yield this.render('index.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const title = this.request.body.title;
  const content = this.request.body.content;
  const slug = this.request.body.slug;
  yield this.service.article.insert(title, content, slug);

  this.redirect('manager');

};

// 更新文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const content = this.request.body.content;
  const sub_title = this.request.body.sub_title;

  yield this.service.article.update({
    id,
    title,
    content,
    sub_title,
  });

  this.redirect(`/article?id=${id}`);
};

// 删除一个文章
exports.deleteArticle = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.article.deleteArticle(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.article.find(id);

  article.fromNow = moment(article.modified).fromNow();
  article.html = marked(article.content);

  yield this.render('post.html', article);
};
