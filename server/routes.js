module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('./client/app');
  });

  app.get('/api/login', require('./api/login'));
  app.get('/api/forum', require('./api/forum'));
  app.get('/api/topic', require('./api/topic'));
  app.get('/test', function (req, res, next) {
    res.end(req.cookies.ngaCookie);
  });
};