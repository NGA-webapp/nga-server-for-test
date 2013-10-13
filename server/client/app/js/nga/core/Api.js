define(function (require, exports) {
  var NGACN = 'http://bbs.ngacn.cc';
  var YAHOOAPIS = 'http://query.yahooapis.com/v1/public/yql?q=';

  // 构建yql查询地址
  var getYahooUrl = function (url, type) {
    if (type !== 'xml') {
      type = 'html';
    }
    return YAHOOAPIS + 'select * from ' + type + ' where url="' + NGACN + url + '"&format=json&callback=';
  };

  // 通过yql请求数据
  var connectYahoo = exports.connectYahoo = function (url, type, next) {
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

  // 直接请求数据
  var connect = exports.connect = function (url, type, next) {
    var theUrl = NGACN + url;
    if (type !== 'xml') {
      type = 'html';
    }
    $$.get(theUrl, {}, function (data) {
      var arr, result;
      var i, len;
      if (type === 'xml') {
        window.data = data;
        next(data);
      } else {
        window.data = data;
        arr = data.split('=');
        result = '';
        for (i = 1, len = arr.length; i < len; i++) {
          result += arr[i];
        }
        next(JSON.parse(result));
      }
    }, type);
  };

});