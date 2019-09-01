module.exports = application => {
  application.get('/api/users', function (req, res) {
    application.app.controllers.users.get(application, req, res);
  });

  application.post('/api/users', function (req, res) {
    application.app.controllers.users.post(application, req, res);
  });

  application.get('/api/users/:id', function (req, res) {
    application.app.controllers.users.getById(application, req, res);
  });

  application.put('/api/users/:id', function (req, res) {
    application.app.controllers.users.put(application, req, res);
  });

  application.delete('/api/users/:id', function (req, res) {
    application.app.controllers.users.delete(application, req, res);
  });
};
