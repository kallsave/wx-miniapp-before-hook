import { upperInitial } from '../util/lang'

const hookNameList = ['onLoad', 'onShow']

const originPage = Page

export default {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true
    Page = (options) => {
      for (let i = 0; i < hookNameList.length; i++) {
        const hookName = hookNameList[i]
        const beforeHookName = `before${upperInitial(hookName)}`
        const beforeHook = options[beforeHookName]
        if (typeof beforeHook === 'function') {
          const originHook = options[hookName]
          options[hookName] = function () {
            beforeHook(arguments, () => {
              originHook.apply(this, arguments)
            })
          }
        }
      }
      originPage(options)
    }
  }
}
