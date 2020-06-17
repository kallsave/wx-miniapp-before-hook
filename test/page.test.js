import './config/index'

const onLoadList = []
const onShowList = []

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
    await getOnLoadData()
    onLoadList.push('beforeOnLoad')
    next()
  },
  onLoad(e) {
    onLoadList.push('onLoad')
  },
  beforeOnShow(e, next) {
    onShowList.push('beforeOnShow')
    next()
  },
  onShow(e) {
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

  it('beforeOnLoad next success', () => {
    expect(onLoadList).toEqual(['beforeOnLoad', 'onLoad'])
  })

  it('beforeOnShow next success', () => {
    expect(onShowList).toEqual(['beforeOnShow', 'onShow'])
  })

})
