define(function (require) {
  return function (next) {
    require('./base').connect('/template/js/nga_global.xml', 'xml', next);
  };
});