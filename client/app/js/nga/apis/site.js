define(function (require) {
  return function (next) {
    // require('./base').connect('/index.php?lite=js', 'js', next);
    require('./base').connectSimulator('/api/site', next);
  };
});