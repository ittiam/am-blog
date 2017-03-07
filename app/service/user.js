'use strict';

const crypto = require('crypto');

module.exports = app => {
  class UserService extends app.Service {

    * insert(username, password, email, group) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');

      const result = yield app.mysql.insert('t_users', {
        username,
        password: md5Password,
        email,
        group_name: group,
        created: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

    * login(username, password) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');

      const user = yield app.mysql.select('t_users', {
        where: {
          username,
          password: md5Password,
        },
      });

      return user.length;
    }

  }

  return UserService;
};
