define(function (require, exports) {
  var NGACN = 'http://bbs.ngacn.cc';
  var YAHOOAPIS = 'http://query.yahooapis.com/v1/public/yql?q=';

  var getUrl = function (url, type) {
    if (type !== 'xml') {
      type = 'html';
    }
    return YAHOOAPIS + 'select * from ' + type + ' where url="' + NGACN + url + '"&format=json&callback=';
  };

  var connect = exports.connect = function (url, type, next) {
    $$.get(getUrl(url, type), {}, function (data) {
      var origin, arr, result;
      var i, len;
      if (type === 'xml') {
        next(data.query.results);
      } else {
        origin = data.query.results.body.p;
        arr = origin.split('=');
        result = '';
        for (i = 1, len = arr.length; i < len; i++) {
          result += arr[i];
        }
        next(JSON.parse(result));
      }
    });
  };

});