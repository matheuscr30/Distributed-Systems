module.exports = application => {
  application.post('/api/login', function (req, res) {
    application.app.controllers.auth.login(application, req, res);
  });
};
