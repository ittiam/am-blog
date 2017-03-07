'use strict';

module.exports = app => {
  class ContentServer extends app.Service {
    * insert(title, content, slug) {
      const result = yield app.mysql.insert('t_contents', {
        title,
        slug,
        content,
        created: app.mysql.literals.now,
        modified: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * getArticles(pageNum, pageSize) {
      const articles = yield app.mysql.query('select cid, DATE_FORMAT(created, "%Y / %m / %d") as created, title, slug, content from t_contents order by created desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);

      return articles;
    }

    * publish() {

    }

    * update() {

    }
  }
  return ContentServer;
};
