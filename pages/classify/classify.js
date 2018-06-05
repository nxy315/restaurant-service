// pages/classify/classify.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperInit: {
      dots: true,
      dotsColor: 'rgba(255, 60, 119, .3)',
      dotsActiveColor: 'rgba(255, 60, 119, 1)',
      autoplay: true,
      interval: 3000,
      circular: true,
      duration: 500
    },//swiper 配置

    varietyIndex: 0,
    variety: [
      { name: '全部' },
      { name: '烧腊卤水' },
      { name: '饭系列' },
      { name: '面系列' },
      { name: '汤系列' },
      { name: '点心系列' },
      { name: '小吃系列' },
      { name: '展开' },
    ],// 商品分类

    bannerList: [],//广告数据
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

  // 跳转详情
  toDetail(e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  // 选择品类
  chooseVariety(e) {
    let i = e.currentTarget.dataset.index;
    this.setData({
      varietyIndex: i
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds(101)
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