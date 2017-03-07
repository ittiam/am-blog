'use strict';

const loginRule = {
  username: 'string',
  password: 'password',
};

module.exports = app => {
  class AuthController extends app.Controller {
    * login() {
      const { ctx } = this;
      const login = ctx.session.login;

      if (login) {
        ctx.redirect('/manager');
      } else {
        yield ctx.render('admin/login.html');
      }
    }

    * doLogin() {
      const { ctx, service } = this;

      ctx.validate(loginRule);

      const username = ctx.request.body.username;
      const password = ctx.request.body.password;

      const login = yield service.user.login(username, password);

      if (login) {
        ctx.session.login = true;
        ctx.body = {
          success: 1,
          msg: '登录成功',
        };
      }
    }
  }

  return AuthController;
}
