// pages/clearing/clearing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: ['隔日到货','48小时必达'],
    index: 0,
  },

  chooseAddress() {
    wx.navigateTo({
      url: '/pages/me/address/address',
    })
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  pay() {
    wx.navigateTo({
      url: '/pages/pay/pay',
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