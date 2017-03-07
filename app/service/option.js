'use strict';

module.exports = app => {
  class OptionService extends app.Service {
    * insert(name, value, description) {
      const result = yield app.mysql.insert('t_options', {
        name,
        value,
        description,
      });

      return result.affectedRows === 1;
    }
  }

  return OptionService;
};
