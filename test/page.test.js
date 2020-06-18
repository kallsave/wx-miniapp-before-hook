import './config/index'

const onLoadList = []
const onShowList = []

let beforeOnLoadArg
let onLauchArg

let beforeOnShowArg
let onShowArg

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
    await getOnLoadData()
    onLoadList.push('beforeOnLoad')
    next()
  },
  onLoad(e) {
    onLauchArg = e
    onLoadList.push('onLoad')
  },
  beforeOnShow(e, next) {
    beforeOnShowArg = e
    onShowList.push('beforeOnShow')
    next()
  },
  onShow(e) {
    onShowArg = e
    onShowList.push('onShow')
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

  it('beforeOnShow arg to be onShow arg', () => {
    expect(beforeOnShowArg).toBe(onShowArg)
  })

  it('beforeOnLoad next success', () => {
    expect(onLoadList).toEqual(['beforeOnLoad', 'onLoad'])
  })

  it('beforeOnShow next success', () => {
    expect(onShowList).toEqual(['beforeOnShow', 'onShow'])
  })

})
