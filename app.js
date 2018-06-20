//app.js
App({
  onLaunch: function () {
    // this.getUserData();
    // this.login()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
              

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  hasToken() {
    let token = wx.getStorageSync('token') ? true : false
    return token
  },
  getToken() {
    let token = wx.getStorageSync('token') ? wx.getStorageSync('token') : null
    return token
  },

  /**
   * get请求拦截
   * 
   * @header[version]             版本号
   * @header[access-token]    加密数据
   * @header[user-token]        token
   */
  get(url, params, fn, finalFn){
    let arr = []
    let paramsStr = ''
    let token = wx.getStorageSync('token')
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
        'version': this.globalData.version,
        'user-token': token
      },
      success: data => {
        if(data.data.code ==  -14) {
          if(this.globalData.loging) return

          this.globalData.loging = true
          this.login()
        } else {
          fn && fn(data.data.data)
        }
      },
      complete: () => {
        wx.hideLoading()
        finalFn && finalFn()
      }
    })
  },

  /**
   * post请求拦截 
   * 
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]         验签
   */
  post(url, params, fn) {
    let token = wx.getStorageSync('token')
    wx.request({
      method: 'post',
      url: `${this.globalData.reqUrl+url}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': this.globalData.version,
        'user-token': token
      },
      data: params,
      success: data => {
        if (data.data.code == -14) {
          if (this.globalData.loging) return

          this.globalData.loging = true
          this.login()
        } else {
          fn && fn(data.data.data)
        }
      },
    })
  },

  getUserData() {
    this.get('/api/5b260352d8f9e.html', {}, data => {
      this.globalData.hasUserInfo = true
      this.globalData.userInfo = data.info
    })
  },

  /**
   * 用户登录
   */
  login() {
    wx.login({
      success: res => {
        let code = res.code
        wx.getUserInfo({
          withCredentials: true,
          success: response => {
            console.log(response)
            this.post(`/api/5b25e319e44c0.html`, {
              code,
              signature: response.signature,
              rawData: response.rawData,
              encryptedData: response.encryptedData,
              iv: response.iv
            }, data => {
              wx.setStorage({
                key: 'token',
                data: data.user_token,
                success: () => {
                  this.getUserData()
                }
              })
            })
          }
        })
      }
    })
  },

  /**
   * 获取token
   */
  getToken(uid) {
    this.get('/api/5b260352d8f9e.html', {uid}, data => {
      console.log(data)
    })
  },

  /**
   * 页面滚动(吸顶条固定)
   */
  scroll(e, height, data, that) {
    // console.log(e)
    let direction = e.detail.deltaY
    if (direction < 0) {
      if (e.detail.scrollTop >= height) {
        that.setData({
          [data]: true
        })
      }
    } else {
      if (e.detail.scrollTop <= height) {
        that.setData({
          [data]: false
        })
      }
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
      // 所以此处加入 callback 以防止这种情况  
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理  
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }  
  },
  
  globalData: {
    loging: false,
    hasUserInfo: false,
    userInfo: null,
    reqUrl: 'https://api.youcanwuchu.com',//请求域名
    imgUrl: 'http://www.youcanwuchu.com/Public/Uploads/',//图片拼接路径
    version: 'v2.0',//版本号 需要填在请求的header头部
  }
})