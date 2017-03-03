exports.mysql = {
  client: {
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'mysq1',
    database: 'amblog'
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false
};
