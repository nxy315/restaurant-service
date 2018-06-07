// pages/forum/forum.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { icon: 'sort_light', name: '全部' },
      { icon: 'post', name: '产品需求' },
      { icon: 'hot', name: '厂商新品' },
    ],
    currentType: 0,
    bannerList: [],//广告数据
  },

  toCity() {
    wx.navigateTo({
      url: '/pages/forum/city/city',
    })
  },

  // 广告数据
  getAds(id) {
    wx.request({
      method: 'get',
      url: `${app.globalData.reqUrl}/api/5b169d7bb041d.html?adplace=${id}`,
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'version': app.globalData.version
      },
      success: data => {
        this.setData({
          bannerList: data.data.data.ad_list
        })
      },
    })
  },

  tapTypes(e) {
    let i = e.currentTarget.dataset.index;
    this.setData({
      currentType: i
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(102)
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