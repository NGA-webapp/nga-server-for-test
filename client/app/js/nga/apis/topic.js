define(function (require) {
  return function (tid, page, next) {
    // require('./base').connect('/read.php?tid=' + tid + '&page=' + page + '&lite=xml&v2', 'xml', next);
    require('./base').connectSimulator('/api/topic?tid=' + tid + '&page=' + page, next);
  };
});