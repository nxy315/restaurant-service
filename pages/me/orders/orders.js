// pages/me/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl,
    types: [
      { name: '全部' },
      { name: '待付款' },
      { name: '待发货' },
      { name: '已完成' },
    ],
    orders: [],//订单数据
    swiperInit: {
      duration: 200
    },
    currentType: -1
  },

  /**
   * 获取订单数据
   * @method: GET 
   * @url: /api/5b26780224c31.html
   *
   * @param ostate:Int              0 全部订单 1 待付款 2 待发货 8 已完成
   * @header[version]               版本号
   * @header[access-token]      验签
   * @header[user-token]          验签
   */
  getOrderList() {
    app.get('/api/5b26780224c31.html', {
      ostate: this.data.currentType
    }, data => {
      this.setData({
        orders: data.orders_list
      })
    })
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
      // currentType: i
      currentType: 0
    }, () => {
      this.getOrderList()
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