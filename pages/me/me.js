// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin: false,
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
    this.setData({
      isLogin: false
    })
  },
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  navigatePage(e) {
    console.log(e)
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  // 订单页
  toOrder() {
    wx.navigateTo({
      url: '/pages/me/orders/orders',
    })
  },

  showAction: function () {
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