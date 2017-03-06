'use strict';

module.exports = app => {
  class OptionService extends app.Service {
    * insert(title, url) {
      const result = yield app.mysql.insert('t_options', {

      });

      return result.affectedRows === 1;
    }
  }
}
