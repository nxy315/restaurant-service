// pages/me/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { name: '全部' },
      { name: '待付款' },
      { name: '待发货' },
      { name: '已完成' },
    ],
    swiperInit: {
      duration: 200
    },
    currentType: 0
  },

  tapTypes(e) {
    let i = e.target.dataset.index;
    this.setData({
      currentType: i
    })
  },
  /* 切换swiper，改变索引 */ 
  changeType(e) {
    let i = e.detail.current;
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