// 判断是否已经安装博客

module.exports = (options, app) => {
  return function* install(next) {
    if (this.isInstall) {
      yield next;
    }
    const isInstallByDB = yield this.service.site.count();

    if (isInstallByDB) {
      this.isInstall = true;
      yield next;
    } else {
      this.redirect('/install');
    }
  }
}
