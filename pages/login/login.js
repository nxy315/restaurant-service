// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasScope: true
  },

  login() {
    wx.login({
      success: res => {
        let code = res.code
        wx.getUserInfo({
          withCredentials: true,
          success: response => {
            console.log(response)
            app.post(`/api/5b25e319e44c0.html`, {
              code,
              signature: response.signature,
              rawData: response.rawData,
              encryptedData: response.encryptedData,
              iv: response.iv
            }, data => {
              console.log('gohome1')
              wx.setStorage({
                key: 'token',
                data: data.user_token,
                success: () => {
                  this.getUserData(() => {
                    console.log('gohome3')
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  })
                }
              })
            })
          }
        })
      }
    })
  },

  getUserData(fn) {
    app.get('/api/5b260352d8f9e.html', {}, data => {
      app.globalData.hasUserInfo = true
      app.globalData.userInfo = data.info
      console.log('gohome2')
      fn && fn()
    })
  },

  /**
   * 授权操作
   */
  bindGetUserInfo(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.login()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    if(token) {
      this.getUserData(() => {
        wx.switchTab({
          url: '/pages/home/home',
        })
      })
    } else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            console.log(1)
            this.login()
          } else {
            console.log(2)
            this.setData({
              hasScope: false
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})