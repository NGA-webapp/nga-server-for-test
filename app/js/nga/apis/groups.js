define(function (require) {
  return function (next) {
    require('./base').connect('/template/js/nga_index_forums.xml', 'xml', next);
  };
});