import './config/index'

const onLauchList = []
const onShowList = []

let getOnLaunchDataPromise
let getOnShowDataPromise

function getOnLaunchData() {
  if (!getOnLaunchDataPromise) {
    getOnLaunchDataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
  return getOnLaunchDataPromise
}

function getOnShowData() {
  if (!getOnShowDataPromise) {
    getOnShowDataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }
  return getOnShowDataPromise
}

const options = {
  async beforeOnLaunch(e, next) {
    await getOnLaunchData()
    onLauchList.push('beforeOnLaunch')
    next()
  },
  onLaunch(e) {
    onLauchList.push('onLaunch')
  },
  beforeOnShow(e, next) {
    onShowList.push('beforeOnShow')
    next()
  },
  onShow(e) {
    onShowList.push('onShow')
  }
}

App(options)

describe('test app before hook', () => {
  beforeEach(async (done) => {
    await getOnLaunchData()
    await getOnShowData()
    done()
  })

  it('beforeOnLaunch next success', () => {
    expect(onLauchList).toEqual(['beforeOnLaunch', 'onLaunch'])
  })

  it('beforeOnShow next success', () => {
    expect(onShowList).toEqual(['beforeOnShow', 'onShow'])
  })

})
