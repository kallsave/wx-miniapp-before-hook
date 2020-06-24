wx-miniapp-before-hook
========================================

功能
------------
给微信小程序带来
- 1.给App增加beforeOnLaunch,beforeShow的钩子
- 2.给Page增加beforeOnLoad,beforeShow的钩子

安装
------------
npm install wx-miniapp-before-hook --save

使用
------------
在微信开发者工具中先构建npm生成miniprogram_npm文件夹
```javascript
// app.js
// 导入js给App,Page增加before扩展
import './miniprogram_npm/wx-miniapp-before-hook/index'
```

```javascript
// app.js
App({
  beforeOnLaunch(e, next) {
    // e和onLaunch的e是同一个对象
    console.log(e)
    // next执行后onLaunch开始执行
    next()
  },
  onLaunch(e) {

  },
  async beforeShow(e, next) {
    // e和onLaunch的e是同一个对象
    console.log(e)
    // next执行后onShow开始执行
    next()
  },
  onShow(e) {

  }
})
```

```javascript
// page.js
import { checkLogin } from './common/login'

Page({
  beforeOnLoad(e, next) {
    // e和onLoad的e是同一个对象
    console.log(e)
    // next执行后onLoad开始执行
    next()
  },
  onLoad(e) {

  },
  // 在这个钩子里可以抽离一些通用异步逻辑,比如小程序登录
  async beforeShow(next) {
    await checkLogin()
    // next执行后onShow开始执行
    next()
  },
  onShow() {

  }
})
```
