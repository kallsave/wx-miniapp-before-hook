import './config/index'

const onLauchList = []
const onShowList = []

let beforeOnLauchArg
let onLauchArg

let beforeOnShowArg
let onShowArg

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
    beforeOnLauchArg = e
    await getOnLaunchData()
    this.pushOnLauchList('beforeOnLaunch')
    next()
  },
  onLaunch(e) {
    onLauchArg = e
    this.pushOnLauchList('onLaunch')
  },
  beforeOnShow(e, next) {
    beforeOnShowArg = e
    this.pushOnShowList('beforeOnShow')
    next()
  },
  onShow(e) {
    onShowArg = e
    this.pushOnShowList('onShow')
  },
  pushOnLauchList(item) {
    onLauchList.push(item)
  },
  pushOnShowList(item) {
    onShowList.push(item)
  }
}

App(options)

describe('test app before hook', () => {
  beforeEach(async (done) => {
    await getOnLaunchData()
    await getOnShowData()
    done()
  })

  it('beforeOnLauch arg to be onLauch arg', () => {
    expect(beforeOnLauchArg).toBe(onLauchArg)
  })

  it('beforeOnShow arg to be onShow arg', () => {
    expect(beforeOnShowArg).toBe(onShowArg)
  })

  it('beforeOnLaunch next onLaunch success', () => {
    expect(onLauchList).toEqual(['beforeOnLaunch', 'onLaunch'])
  })

  it('beforeOnShow next success', () => {
    expect(onShowList).toEqual(['beforeOnShow', 'onShow'])
  })

})
