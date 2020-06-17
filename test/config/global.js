const appInitHooks = ['onLaunch', 'onShow']

global.App = function (options) {
  const e = {}
  appInitHooks.forEach((item) => {
    const hook = options[item]
    hook && hook.call(options, e)
  })
  return options
}

const pageInitHooks = ['onLoad', 'onShow']

global.Page = function (options) {
  const e = {}
  pageInitHooks.forEach((item) => {
    const hook = options[item]
    hook && hook.call(options, e)
  })
  return options
}
