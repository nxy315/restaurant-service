// pages/me/me.js
const app = getApp()
import { getData, login } from '../../utils/ajax'
import { wxSetData } from '../../utils/wxApi.Pkg'
var regeneratorRuntime = require('../../libs/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orders: [
      { name: '待付款', icon: 'order_will', num: 1 },
      { name: '待发货', icon: 'order_car', num: 2 },
      { name: '已完成', icon: 'order_done', num: 8 },
      { name: '全部订单', icon: 'order_all', num: 0 },
    ],
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
      let data = await getData('/api/5b260352d8f9e.html', {})
      app.globalData.userInfo = data.info
      this.setData({
        userInfo: data.info
      })
    } catch (err) {
      if (err == -14) {
        await login()
      }
    }
  },

  // 跳转至用户信息页
  toInfo() {
    wx.navigateTo({
      url: '/pages/me/userinfo/userinfo',
    })
  },

  login() {
    this.setData({
      isLogin: true
    })
  },
  logout() {
    wx.removeStorageSync('token')
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  navigatePage(e) {
    let i = e.currentTarget.dataset.index
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `${url}?index=${i}`,
    })
  },

  showAction: function () {
    wx.makePhoneCall({
      phoneNumber: '18721823536'
    })
  },

  showAction2: function () {
    wx.makePhoneCall({
      phoneNumber: '13916344088'
    })
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
    this.getUserData()
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
})