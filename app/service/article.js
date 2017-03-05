'use strict';

module.exports = app => {
  class MonthServer extends app.Service {
    * insert(title, content, slug) {
      const result = yield app.mysql.insert('articles', {
        title,
        slug,
        content,
        created: app.mysql.literals.now,
        modified: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    // 获取文章列表
    * list(pageNum, pageSize) {
      const articles = yield app.mysql.query('select id, DATE_FORMAT(created, "%Y / %m / %d") as created, title, slug, content from articles order by created desc limit ? offset ?;', [ pageSize, (pageNum - 1) * pageSize ]);

      return articles;
    }

    // 获取文章列表
    * find(id) {
      const article = yield app.mysql.get('articles', { id });

      return article;
    }

    // 文章总数
    * count() {
      const count = yield app.mysql.query('select count(*) from articles');

      return count[0]['count(*)'];
    }

    // 删除文章
    * update(data) {
      const result = yield app.mysql.update('articles', data);

      return result.affectedRows === 1;
    }

    // 删除文章
    * deleteArticle(id) {
      const result = yield app.mysql.delete('articles', {
        id,
      });

      return result.affectedRows === 1;
    }

  }
  return MonthServer;
};
