define(function (require) {
  return function (fid, page, next) {
    require('./base').connect('/thread.php?fid=' + fid + '&page=' + page + '&lite=xml', 'xml', next);
  };
});