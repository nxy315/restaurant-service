//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  get(url, params, fn, finalFn){
    let arr = []
    let paramsStr = ''
    if(JSON.stringify(params) != '{}') {
      for(let item in params) {
        arr.push(`${item}=${params[item]}`)
      }
      paramsStr = '?' + arr.join('&')
    }
    
    
    wx.request({
      method: 'get',
      url: `${this.globalData.reqUrl+url+paramsStr}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': this.globalData.version
      },
      success: data => {
        fn && fn(data.data.data)
      },
      complete: () => {
        finalFn && finalFn()
      }
    })
  },
  post(url, params, fn) {
    wx.request({
      method: 'post',
      url: `${this.globalData.reqUrl+url}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': this.globalData.version
      },
      data: params,
      success: data => {
        fn && fn()
      },
    })
  },
  globalData: {
    userInfo: null,
    reqUrl: 'https://api.youcanwuchu.com',//请求域名
    imgUrl: 'http://www.youcanwuchu.com/Public/Uploads/',//图片拼接路径
    version: 'v2.0',//版本号 需要填在请求的header头部
  }
})