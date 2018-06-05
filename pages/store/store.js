// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],//图片列表
    name: '',//店铺名字
    num: '',//店铺电话
  },

  getList(id) {
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id
      },
      success: data => {
        let list
        this.setData({
          list
        })
      },
    })
  },

  showAction: function () {
    wx.makePhoneCall({
      phoneNumber: '123456789'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    // this.getList(id)
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