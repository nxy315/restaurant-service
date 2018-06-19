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
    currentType: -1
  },

  tapTypes(e) {
    let i = e.currentTarget.dataset.index;
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

  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = options.index
    this.setData({
      currentType: i
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