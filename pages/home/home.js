// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(255, 60, 119, 1)',
      duration: 300
    },//swiper 配置
    resultSwiper: {
      duration: 200
    },
    types: [
      { name: '全部' },
      { name: '最新入驻' },
      { name: '人气排名' },
    ],
    currentType: 0,
  },

  toList() {
    wx.navigateTo({
      url: '/pages/home/list/list',
    })
  },

  /* 切换swiper，改变索引 */
  changeType(e) {
    let i = e.detail.current;
    this.setData({
      currentType: i
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