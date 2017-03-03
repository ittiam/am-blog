module.exports = app => {
  return class Meta extends app.Service {
    * find(mid) {
      const meta = yield app.mysql.get('t_metas', {
        mid: mid
      });

      return meta;
    }
  }
}
