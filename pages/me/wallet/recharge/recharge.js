// pages/me/wallet/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: [
      '充值3000送2%得3060',
      '充值5000送3%得5150',
      '充值10000送5%得10500'
    ],
    index: 0
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  recharge() {
    wx.redirectTo({
      url: '/pages/me/wallet/wallet',
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