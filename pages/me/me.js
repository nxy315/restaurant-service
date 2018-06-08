// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  // 跳转至用户信息页
  toInfo() {
    wx.navigateTo({
      url: '/pages/me/userinfo/userinfo',
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