// Generated by CoffeeScript 1.6.3
(function() {
  var TodoApp;

  Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };

  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
  };

  TodoApp = (function() {
    function TodoApp() {
      this.cacheElements();
      this.bindEvents();
      this.displayItems();
    }

    TodoApp.prototype.cacheElements = function() {
      this.$input = $('#new-todo');
      return this.$todoList = $('#todo-list');
    };

    TodoApp.prototype.displayItems = function() {
      var id, _i, _len, _ref, _results;
      this.clearItems();
      _ref = Object.keys(localStorage);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push(this.addItem(localStorage.getObj(id)));
      }
      return _results;
    };

    TodoApp.prototype.clearItems = function() {
      return this.$todoList.empty();
    };

    TodoApp.prototype.addItem = function(item) {
      var html;
      html = "<li " + (item.completed ? 'class="completed"' : '') + " data-id=\"" + item.id + "\">\n  <div class=\"view\">\n    <input class=\"toggle\" type=\"checkbox\" " + (item.completed ? 'checked' : '') + ">\n    <label>" + item.title + "</label>\n    <button class=\"destroy\">del</button>\n  </div>\n</li>";
      return this.$todoList.append(html);
    };

    TodoApp.prototype.bindEvents = function() {
      var _this = this;
      this.$input.on('keyup', function(e) {
        return _this.create(e);
      });
      this.$todoList.on('click', '.destroy', function(e) {
        return _this.destroy(e.target);
      });
      this.$todoList.on('change', '.toggle', function(e) {
        return _this.toggle(e.target);
      });
      return $('#clear-completed').click(function(e) {
        return _this.clear(e);
      });
    };

    TodoApp.prototype.clear = function(e) {
      $('.completed').each(function() {
        return localStorage.removeItem($(this).data("id"));
      });
      return this.displayItems();
    };

    TodoApp.prototype.create = function(e) {
      var randomId, val;
      val = $.trim(this.$input.val());
      if (!(e.which === 13 && val)) {
        return;
      }
      randomId = Math.floor(Math.random() * 999999);
      localStorage.setObj(randomId, {
        id: randomId,
        title: val,
        completed: false
      });
      this.$input.val('');
      return this.displayItems();
    };

    TodoApp.prototype.destroy = function(elem) {
      var id;
      id = $(elem).closest('li').data('id');
      localStorage.removeItem(id);
      return this.displayItems();
    };

    TodoApp.prototype.toggle = function(elem) {
      var id, item;
      id = $(elem).closest('li').data('id');
      item = localStorage.getObj(id);
      item.completed = !item.completed;
      return localStorage.setObj(id, item);
    };

    return TodoApp;

  })();

  $(function() {
    var app;
    return app = new TodoApp();
  });

}).call(this);
