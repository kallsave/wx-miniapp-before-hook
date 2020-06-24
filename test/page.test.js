import './config/index'

const onLoadList = []
const onShowList = []

let beforeOnLoadArg
let onLauchArg

let getOnLoadDataPromise
let getOnShowDataPromise

function getOnLoadData() {
  if (!getOnLoadDataPromise) {
    getOnLoadDataPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
  return getOnLoadDataPromise
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
  async beforeOnLoad(e, next) {
    beforeOnLoadArg = e
    getOnLoadData()
    this.pushOnLoadList('beforeOnLoad')
    next()
  },
  onLoad(e) {
    onLauchArg = e
    this.pushOnLoadList('onLoad')
  },
  async beforeOnShow(next) {
    await getOnShowData()
    this.pushOnShowList('beforeOnShow')
    next()
  },
  onShow() {
    this.pushOnShowList('onShow')
  },
  pushOnLoadList(item) {
    onLoadList.push(item)
  },
  pushOnShowList(item) {
    onShowList.push(item)
  }
}

Page(options)

describe('test app before hook', () => {
  beforeEach(async (done) => {
    await getOnLoadData()
    await getOnShowData()
    done()
  })

  it('beforeOnLauch arg to be onLauch arg', () => {
    expect(beforeOnLoadArg).toBe(onLauchArg)
  })

  it('beforeOnLoad next success', () => {
    expect(onLoadList).toEqual(['beforeOnLoad', 'onLoad'])
  })

  it('beforeOnShow next success', () => {
    expect(onShowList).toEqual(['beforeOnShow', 'onShow'])
  })

})
