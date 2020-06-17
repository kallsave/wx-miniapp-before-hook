/*!
 * wx-miniapp-before-hook.js v1.0.0
 * (c) 2019-2020 kallsave <415034609@qq.com>
 * Released under the MIT License.
 */
function upperInitial(str) {
  if (!str.length) {
    return str;
  }

  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

var hookNameList = ['onLaunch', 'onShow'];
var originApp = App;
var appInstaller = {
  install: function install() {
    if (this.installed) {
      return;
    }

    this.installed = true;

    App = function App(options) {
      var _loop = function _loop(i) {
        var hookName = hookNameList[i];
        var beforeHookName = "before".concat(upperInitial(hookName));
        var beforeHook = options[beforeHookName];

        if (typeof beforeHook === 'function') {
          var originHook = options[hookName];

          options[hookName] = function () {
            var _arguments = arguments,
                _this = this;

            beforeHook(arguments, function () {
              originHook.apply(_this, _arguments);
            });
          };
        }
      };

      for (var i = 0; i < hookNameList.length; i++) {
        _loop(i);
      }

      originApp(options);
    };
  }
};

var hookNameList$1 = ['onLoad', 'onShow'];
var originPage = Page;
var pageInstaller = {
  install: function install() {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Page = function Page(options) {
      var _loop = function _loop(i) {
        var hookName = hookNameList$1[i];
        var beforeHookName = "before".concat(upperInitial(hookName));
        var beforeHook = options[beforeHookName];

        if (typeof beforeHook === 'function') {
          var originHook = options[hookName];

          options[hookName] = function () {
            var _arguments = arguments,
                _this = this;

            beforeHook(arguments, function () {
              originHook.apply(_this, _arguments);
            });
          };
        }
      };

      for (var i = 0; i < hookNameList$1.length; i++) {
        _loop(i);
      }

      originPage(options);
    };
  }
};

var plugin = {
  install: function install() {
    if (this.installed) {
      return;
    }

    this.installed = true;
    appInstaller.install();
    pageInstaller.install();
  },
  verson: '1.0.0'
};
plugin.install();

export default plugin;
