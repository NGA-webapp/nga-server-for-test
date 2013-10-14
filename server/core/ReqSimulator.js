var https = require('https');
var http = require('http');
var iconv = require('iconv-lite');
var CookieJar = require('cookiejar').CookieJar;
var CookieAccess = require('cookiejar').CookieAccessInfo;
var urlParser = require('url').parse;
var trim = require('../utils/common').trim;
var cheerio = require('cheerio');
var querystring = require('querystring');
var jsonToUrlEncode = require('../utils/common').jsonToUrlEncode;
var _ = require('underscore');

/**
 * http/https请求模拟器
 * @class  ReqSimulator
 * @chainable
 */
var ReqSimulator = function () {
  this._url = '';
  this._data = null;
  this._encoding = 'gbk';
  this._type = '';
  this._headers = {};
  this._cookieJar = new CookieJar();
  return this;
};
/**
 * 设置url
 * @method  url
 * @for  ReqSimulator
 * @param  {string} url 将请求的url
 * @return {ReqSimulator}     this
 */
ReqSimulator.prototype.url = function (url) {
  this._url = url;
  return this;
};
/**
 * 设置queryData
 * @method   data
 * @for  ReqSimulator
 * @param  {string} data  json格式的params
 * @return {ReqSimulator}     this
 */
ReqSimulator.prototype.data = function (data) {
  this._data = data;
  return this;
};
/**
 * 设置request headers
 * @method   headers
 * @for  ReqSimulator
 * @param  {object} headers  request headers
 * @return {ReqSimulator}     this
 */
ReqSimulator.prototype.headers = function (headers) {
  this._headers = headers;
  return this;
};
/**
 * 设置encoding
 * @method  encoding 
 * @for  ReqSimulator
 * @param  {string} encoding  utf8/utf-8/gbk/binary
 * @return {ReqSimulator}     this
 */
ReqSimulator.prototype.encoding = function (encoding) {
  this._encoding = encoding;
  return this;
};
/**
 * 读取header.cookie格式(valueString)的cookie，并载入cookieJar
 * e.g.: spider.loadValueString('cookie2=ee0360de0611491c77434882547fe0e9;t=c3beb226e0011cb255d7150895218269;uc1=cookie14=UoLU6gCnb0rJEw%3D%3D;v=0');
 * @method  loadCookies
 * @for  ReqSimulator
 * @param  {string} cookies header.cookie格式，既CookieJar.toValueString输出的cookie
 * @return {ReqSimulator}         this
 * @chainable
 */
ReqSimulator.prototype.loadCookies = function (cookies) {
  // this._cookieJar.setCookies(trim(cookies.replace(/;/g, ':')));
  this._cookieJar.setCookies(cookies);
  return this;
};

/**
 * 将本次页面的set-cookie与Jar中的内存合并保存为可以在下一次访问时使用的格式
 * @method  _saveSetCookie
 * @for  ReqSimulator
 * @param  {object} response
 * @return {array}          
 * @chainable
 */
ReqSimulator.prototype._saveSetCookie = function (response) {
  var cookies;
  var i ,len;
  var reg, domain, at;
  if (response.headers['set-cookie']) {
    cookies = response.headers['set-cookie'];
    // 查找domain=foo.bar的cookie，为其更正为domain=.foo.bar
    for (i = 0, len = cookies.length; i < len; i++) {
      reg = new RegExp(/;\s*domain=([^\.][\w\.]*)/gi);
      domain = reg.exec(cookies[i]);
      if (domain && domain[1].split('.').length === 2) {
        at = reg.lastIndex - domain[1].length;
        cookies[i] = cookies[i].slice(0, at) + '.' + cookies[i].slice(at);
      }
    }
    console.log('set-cookie');
    console.log(cookies);
    this._cookieJar.setCookies(cookies);
  }
  return this;
};
/**
 * 获取当前jar中的cookie对象
 * method getCookies
 * @for  ReqSimulator
 * @param {object} [options] 可设选项.
 *                           url: 匹配url，默认为this._url。
 *                           name: 匹配cookie名
 * @return {Cookie}          cookie
 */
ReqSimulator.prototype.getCookies = function (options) {
  var access;
  var url;
  options = typeof options === 'undefined' ? {} : options;
  url = options.url || this._url;
  urlInfo = urlParser(url);
  access = new CookieAccess(urlInfo.host, urlInfo.pathname, 'https:' == urlInfo.protocol);
  if (options.name) {
    return this._cookieJar.getCookie(options.name, access);
  } else {
    return this._cookieJar.getCookies(access);
  }
};
/**
 * 获取当前jar中cookies的valueString
 * method getCookiesValueString
 * @for  ReqSimulator
 * @param {object} [options] 可设选项.
 *                           url: 匹配url，默认为this._url。
 *                           name: 匹配cookie名
 * @return {string}          cookiesValueString
 */
ReqSimulator.prototype.getCookiesValueString = function (options) {
  return this.getCookies(options).toValueString();
};
/**
 * 获取当前jar中的cookies的String
 * method getCookiesString
 * @for  ReqSimulator
 * @param {object} [options] 可设选项.
 *                           url: 匹配url，默认为this._url。
 *                           name: 匹配cookie名
 * @return {string}          cookiesString
 */
ReqSimulator.prototype.getCookiesString = function (options) {
  return this.getCookies(options).toString();
};
/**
 * 保存当前html内容，并保存生成的cheerio对象
 * @method _saveHtml
 * @for  ReqSimulator
 * @param  {string} html 当前html内容
 * @return {ReqSimulator}      this
 * @chainable
 */
ReqSimulator.prototype._saveHtml = function (html) {
  this._html = html;
  this._cheerio = cheerio.load(html);
  return this;
};
/**
 * 保存当前file内容
 * @method _saveFile
 * @for  ReqSimulator
 * @param  {string} file 当前file内容
 * @return {ReqSimulator}      this
 * @chainable
 */
ReqSimulator.prototype._saveFile = function (file) {
  this._file = file;
  return this;
};
/**
 * 获取当前html内容
 * @method  getHtml
 * @for  ReqSimulator
 * @return {string} 当前html内容
 */
ReqSimulator.prototype.getHtml = function () {
  return this._html;
};
/**
 * 获取用cheerio封装的当前html内容
 * @method  getCheerio
 * @for  ReqSimulator
 * @return {object} 用cheerio封装的当前html内容
 */
ReqSimulator.prototype.getCheerio = function () {
  return this._cheerio;
};
/**
 * 获取当前file内容
 * @method  getFile
 * @for  ReqSimulator
 * @return {string} 当前file内容
 */
ReqSimulator.prototype.getFile = function () {
  return this._file;
};
/**
 * 发送请求，将返回的Html内容存入成员html，并将页面传递的cookie存入jar。
 * @method  _request
 * @for  ReqSimulator
 * @param  {string}   method   post|data
 * @param  {Function} callback 成功回调
 * @return {ReqSimulator}   this
 * @chainable
 */
ReqSimulator.prototype._request = function (method, callback) {
  var self = this;
  var urls, request, postData, options, req;
  if (!self._url) {
    throw new Error('u should set the url.');
  }
  console.log('requesting: ' + self._url);
  urls = urlParser(this._url);
  // 根据协议选择http或https
  request = urls.protocol === 'https:' ? https.request : http.request;
  // postData = querystring.stringify(self._data);
  // 使用较松的uriencode
  postData = jsonToUrlEncode(self._data, true);
  options = {
    host: urls.host,
    path: urls.path,
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Cookie': self.getCookiesValueString()
    }
  };
  _.extend(options.headers, self._headers);
  req = request(options, function (res) {
    var stack = '';
    switch (self._encoding) {
      case 'utf8': case 'utf-8':
      res.setEncoding('utf-8');
      break;
      case 'binary': case 'gbk':
      res.setEncoding('binary');
      break;
    }
    res.on('data', function (data) {
      stack += data;
      console.log('Recieving...');
    });
    res.on('end', function () {
      var buf, data;
      if (res.headers['location']) {
        self._saveSetCookie(res);
        return self.url(res.headers['location']).get(callback);
      }
      switch (self._encoding) {
        case 'gbk':
        buf = new Buffer(stack, 'binary');
        data = iconv.decode(buf, 'gbk');
        break;
        default:
        data = stack;
        break;
      }
      if (self._encoding === 'binary') {
        self._saveFile(data);
      } else {
        self._saveHtml(data);
      }
      self._saveSetCookie(res);
      console.log('Finished.');
      callback.call(self);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end(postData);
  return this;
};
/**
 * 发送get请求，将返回的Html内容存入成员html，并将页面传递的cookie存入jar。
 * @method  get
 * @for  ReqSimulator
 * @param  {Function} callback 成功回调
 * @return {ReqSimulator}   this
 * @chainable
 */
ReqSimulator.prototype.get = function (callback) {
  this._request('get', callback);
  return this;
};
/**
 * 发送post请求，将返回的Html内容存入成员html，并将页面传递的cookie存入jar。
 * @method  post
 * @for  ReqSimulator
 * @param  {object}   data     json格式的params
 * @param  {Function} callback 成功回调
 * @return {ReqSimulator}   this
 * @chainable
 */
ReqSimulator.prototype.post = function (callback) {
  this._request('post', callback);
  return this;
};

module.exports = ReqSimulator;