'use strict';

module.exports = app => {
  class UserService extends app.Service {

    * insert(username, password, email) {
      const md5Password = crypto.createHash('md5').update(password).digest('hex');

      const result = yield app.mysql.insert('t_users', {
        username,
        password: md5Password,
        email,
        created: app.mysql.literals.now,
      });

      return result.affectedRows === 1;
    }

  }

  return UserService;
};
