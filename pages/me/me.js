// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orders: [
      { name: '待付款', icon: 'order_will', num: 1 },
      { name: '待发货', icon: 'order_car', num: 2 },
      { name: '已完成', icon: 'order_done', num: 3 },
      { name: '全部订单', icon: 'order_all', num: 0 },
    ],
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
    let i = e.currentTarget.dataset.index
    console.log(e)
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `${url}?index=${i}`,
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
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