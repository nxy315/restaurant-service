// pages/login/login.js
const app = getApp()
import { getData, login } from '../../utils/ajax'
import { wxSetData, wxLogin } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasScope: true,
  },

  /**
   * 获取用户信息
   * @method: GET 
   * @url: /api/5b260352d8f9e.html
   * 
   * @header[version]           版本号
   * @header[access-token]      验签
   * @header[user-token]        验签
   */
  async getUserData() {
    try {
      let data = await getData('/api/5b260352d8f9e.html',{})
      app.globalData.userInfo = data.info
      wx.switchTab({
        url: '/pages/home/home',
      })
    } catch (err) {
      if(err == -14) {
        await login()
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }
  },

  /**
   * 授权操作
   */
  async bindGetUserInfo(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      await login()
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      hasScope: true
    }, () => {
      wx.showLoading({
        title: '',
      })
      let token = wx.getStorageSync('token')
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            if (token) {
              this.getUserData()
            } else {
              login().then(res => {
                this.getUserData()
              })
            }
          } else {
            wx.hideLoading()
            this.setData({
              hasScope: false
            })
          }
        }
      })
    })
    
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