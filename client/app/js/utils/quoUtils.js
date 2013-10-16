define(function (require, exports, module) {
  /**
   * 获取元素中的文本，并对quo异常处理，查找不到元素时返回''
   * @param  {quo} $item    由quo封装的一层dom
   * @param  {string} selector 要查找的元素
   * @return {string}          元素中的文本，异常为''
   */
  var getNodeText = exports.getNodeText = function ($item, selector) {
    try {
      return $item.find(selector).text();
    } catch (e) {
      return '';
    }
  };

});
