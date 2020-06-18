/*!
 * wx-miniapp-before-hook.js v1.0.1
 * (c) 2019-2020 kallsave <415034609@qq.com>
 * Released under the MIT License.
 */
function upperInitial(str) {
  if (!str.length) {
    return str
  }
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const hookNameList = ['onLaunch', 'onShow'];

const originApp = App;

var appInstaller = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true;
    App = (options) => {
      for (let i = 0; i < hookNameList.length; i++) {
        const hookName = hookNameList[i];
        const beforeHookName = `before${upperInitial(hookName)}`;
        const beforeHook = options[beforeHookName];
        if (typeof beforeHook === 'function') {
          const originHook = options[hookName];
          options[hookName] = function () {
            const args = arguments;
            beforeHook(...args, () => {
              originHook.apply(this, args);
            });
          };
        }
      }
      originApp(options);
    };
  }
};

const hookNameList$1 = ['onLoad', 'onShow'];

const originPage = Page;

var pageInstaller = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true;
    Page = (options) => {
      for (let i = 0; i < hookNameList$1.length; i++) {
        const hookName = hookNameList$1[i];
        const beforeHookName = `before${upperInitial(hookName)}`;
        const beforeHook = options[beforeHookName];
        if (typeof beforeHook === 'function') {
          const originHook = options[hookName];
          options[hookName] = function () {
            const args = arguments;
            beforeHook(...args, () => {
              originHook.apply(this, args);
            });
          };
        }
      }
      originPage(options);
    };
  }
};

const plugin = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true;
    appInstaller.install();
    pageInstaller.install();
  },
  verson: '1.0.1'
};

plugin.install();

export default plugin;
