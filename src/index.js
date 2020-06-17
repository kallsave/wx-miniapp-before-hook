import appInstaller from './construction/app'
import pageInstaller from './construction/page'

const plugin = {
  install() {
    if (this.installed) {
      return
    }
    this.installed = true
    appInstaller.install()
    pageInstaller.install()
  },
  verson: '1.0.0'
}

plugin.install()

export default plugin
