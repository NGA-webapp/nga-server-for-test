define(function (require, exports, module) {
  var _ = require('underscore');
  module.exports = function (events, argsObj, self) {
    var args = _.toArray(argsObj);
    args.splice(0, 0, events);
    self.trigger.apply(self, args);
  };
});
