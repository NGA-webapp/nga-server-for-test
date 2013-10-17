define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var ThreadModel = require('modules/models/integrations/Thread');
  var tpl = require('templates/forum/forum.tpl');
  var RowForumView = require('modules/views/forum/Row');
  var ForumView = BasicView.extend({
    el: '#forum',
    tpl: art.compile(tpl),
    events: {
      'singleTap .glyphicon-search': function () {
        $self = this.$el.find('.glyphicon-search');
        $self.addClass('animated shake');
        _.delay(function () {$self.removeClass('animated');}, 1000);
      },
      'doubleTap .glyphicon-pencil': function () {
        $.get('/api/login', function () {
          alert('connected!');
          window.location = function () {
            return window.location;
          }();
        });
      }
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new IScroll('.iscroll', { scrollbars: true, interactiveScrollbars: true });
      this.$ul = this.$el.find('ul');
      return this;
    },
    addOne: function (topic) {
      var view = new RowForumView({model: topic});
      this.$ul.append(view.el);
    },
    addAll: function () {
      var self = this;
      ui.Loading.open();
      this.$ul.html('');
      this.model.get('topics').each(this.addOne, this);
      _.delay(function () {
        ui.Loading.close();
        self.$el.find('img').removeClass('hide');
        self.$ul.find('li').removeClass('hide');
      }, 1000);
      _.delay(function () {
        self.scroll.refresh();
      }, 2000);
    },
    fetch: function (options) {
      this.model.fetchXml(options);
    },
    initialize: function () {
      this.model = new ThreadModel();
      this.$ul = this.$el.find('ul');
      this.listenTo(this.model, 'change', this.addAll);
      return this.render();
    }
  });
  module.exports = ForumView;
});
